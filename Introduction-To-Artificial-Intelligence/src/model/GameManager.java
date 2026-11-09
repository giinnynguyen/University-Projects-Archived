
package model;

import Map.RandomMap;
import java.awt.*;
import java.awt.event.*;
import java.awt.geom.Area;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;
import java.util.logging.*;
import javax.swing.*;
import media.media;
import Testview.BigBang;
import Testview.Revive;
import Testview.Whirlwind;

final class GameManager extends JPanel implements Runnable ,    MouseListener{ 
    public Agent player;
    public ViewIpml board1 = new ViewIpml();
    MoveRandom mover = new MoveRandom();
    
   public Map <String,Agent> agents = new HashMap<>();
    public Map <String,AStar> pathfinders = new HashMap<>();
    private Thread threadT;
    
    public static float gameTime = 0;
public static float targetTimer =0;
    
   
   
    Whirlwind whirlwind ;
    BigBang bigBang; 
    Revive revive ;
    
    media sound = new media();
    public GameManager(){
        this.addMouseListener(this);
       this.setOpaque(false); 
      whirlwind   = new Whirlwind(this);
      bigBang= new BigBang(this);
      revive = new Revive(this);
       initGameState();
       addComponent();
       for(String key: pathfinders.keySet()) {  
           if(agents.get(key).status){        
           pathfinders.get(key).runAlgorithm();
           }
       }
       
       enablePlayerMovement();
         
       threadT = new Thread(this);
       threadT.start();
        
       
       
    }
    public void addComponent(){        
        for(int i = 0 ; i< GameState.agentCount ; i++){
         for(int j =0 ; j< 1 ; j++){
             if(  i < (GameState.agentCount/2)){
            agents.put("agent"+i,new Agent(5,2,GameState.agentPositions[i][j],GameState.agentPositions[i][j+1],false ,false , false)); 
            pathfinders.put("agent"+i, new AStar(GameState.agentPositions[i][j],GameState.agentPositions[i][j+1]));
             }else{
            agents.put("agent"+i,new Agent(5,2,GameState.agentPositions[i][j],GameState.agentPositions[i][j+1],false ,true , false)); 
            pathfinders.put("agent"+i, new AStar(GameState.agentPositions[i][j],GameState.agentPositions[i][j+1]));
             }
         }
          agents.get("agent0").status= true;
        }
    }
    
    @Override
       protected  synchronized   void paintComponent(Graphics g) {
       
            super.paintComponent(g);          
		Graphics2D g2d = (Graphics2D) g.create();
		g2d.setColor(new Color(0,0, 0, 170));
               
		Area fill = new Area(new Rectangle(new Point(0, 0), getSize()));
                
                
		g2d.fill(fill);
	
                
                
                g2d.dispose();
            board1.Draw(g);
            
            player.Draw(g);
            for(String key: agents.keySet()){
                if(agents.get(key).status){
                agents.get(key).Draw(g);
                }
            }
             
              
               
            g.drawImage( bigBang.getImg() , Target.x *Grid.cellW -45, Target.y * Grid.cellH-65, null);
         
              g.drawImage(whirlwind.getImg(),50,50, null);
              
      
            g.drawImage(revive.getImg(),Grid.cellW*Grid.countW , 55, null);
        
        
    }
    public Dimension getPreferredSize() {       
        return new Dimension(Grid.countW* Grid.cellW + Grid.extraWidth,Grid.countH *Grid.cellH);
    }
    @Override
    public void run() {   
        int count  =  0  ;
       while(true){
         if(Target.active){
            
             System.out.print("Target position " + Target.x + " " + Target.y) ;
            for(String key : agents.keySet()){
               agents.get(key).posW = pathfinders.get(key).getCursor().getFX();
               agents.get(key).posH = pathfinders.get(key).getCursor().getFY();
               if(pathfinders.get(key).getCursor().getChildren() == null )
                   pathfinders.get(key).setCursor(pathfinders.get(key).getTarget());       
               else
                   pathfinders.get(key).setCursor(pathfinders.get(key).getCursor().getChildren());   

            }
            
           }else {
            for(String key : agents.keySet()){
                   agents.get(key).randomSteps --;           
                   if(agents.get(key).randomSteps ==  0 ){
                       agents.get(key).direction = mover.findValidDirection(agents.get(key).posW,agents.get(key).posH);
                       agents.get(key).randomSteps = 3 + (int) (Math.random() * 5);              
                   }
                  if(agents.get(key).randomSteps > 0 ){
                       if(agents.get(key).direction == 1  && agents.get(key).posW < Grid.countW - 1 && !mover.isWall(agents.get(key).posH,agents.get(key).posW + 1))       
                           agents.get(key).posW ++;
                       else if(agents.get(key).direction == 2  && agents.get(key).posH < Grid.countH - 1 && !mover.isWall(agents.get(key).posH + 1,agents.get(key).posW))   
                           agents.get(key).posH ++;
                       else if(agents.get(key).direction == 3  && agents.get(key).posW >0 && !mover.isWall(agents.get(key).posH,agents.get(key).posW - 1))
                           agents.get(key).posW --;
                       else if(agents.get(key).direction == 4 && agents.get(key).posH >0&& !mover.isWall(agents.get(key).posH - 1,agents.get(key).posW))   
                           agents.get(key).posH --;
                   }                                 
                }     
        }
        
        if(Target.active){
            if(mover.isSamePosition(player.posW, player.posH, Target.x, Target.y)){
                    GameState.allyScore ++;
                  
                       System.out.println();
                                      count++ ;
             System.out.println(count );
             System.out.println( "["+Target.x + "  "+Target.y+"]") ;
                     
                     
                    sound.playAllyScoreSound();
                       if(GameState.allyScore%3==0){
                         for(String k : agents.keySet()){
                             if(agents.get(k).status == false && agents.get(k).isAlly==true) {
                                  agents.get(k).status = true;
                                  sound.playAllyLevelUpSound();
                                break; 
                             }  
                            }
                             }
                    
                    Target.active = false ;
                    targetTimer = 0; 
            }
            else{
            for(String key : agents.keySet()){
                if(agents.get(key).status == true) {
                if(mover.isSamePosition(agents.get(key).posW , agents.get(key).posH, Target.x, Target.y)){         
                    if(agents.get(key).isAlly) {
                        GameState.allyScore ++;
                          System.out.println();
                         count++ ;
             System.out.println(count );
             System.out.println( "["+Target.x + "  "+Target.y+"]") ;
                        sound.playAllyScoreSound(); 
                        if(GameState.allyScore%3==0){
                         for(String k : agents.keySet()){
                             if(agents.get(k).status == false && agents.get(k).isAlly==true) {
                                  agents.get(k).status = true;
                                  sound.playAllyLevelUpSound();
                                break; 
                             }  
                            }
                            
                             }
                            if(GameState.allyScore==12){
                            JOptionPane.showMessageDialog(null,
        "You won!",
        "Backup problem",
        JOptionPane.INFORMATION_MESSAGE);
    System.exit(0);
                            }
                        
                    
                    }else if(!agents.get(key).isAlly){
                        GameState.enemyScore ++;
                        
                                        count++ ;
                                        System.out.println();
             System.out.println(count );
             System.out.println( "["+Target.x + "  "+Target.y+"]") ;
             
             
                         sound.playEnemyScoreSound();
                            agents.get(key).upgradeGhostImage();
                         if(GameState.enemyScore%2==0){
                             GameState.speed-=50 ;
                             if( GameState.speed  < 100) {
                              GameState.speed+=50;
                             }
                            
                            for(String k : agents.keySet()){
                             if(agents.get(k).status == false && agents.get(k).isAlly==false) {
                                  agents.get(k).status = true;
                                   sound.playEnemyLevelUpSound();                                 
                                break; 
                             }  
                            }
                         }
                        if(GameState.enemyScore==12){
                             JOptionPane.showMessageDialog(null,
        "You lost!",
        "Backup problem",
        JOptionPane.INFORMATION_MESSAGE);
    System.exit(0);
                            }
                    }
                    Target.active = false ;
                        targetTimer = 0;
                } 
                }
            }
            }         
        }    
        if(!Target.active )
             targetTimer += 0.5;  
        if(targetTimer % 6.0f == 0 && targetTimer != 0){
             
             targetTimer = 0;
             Target.active = true;
              while(true)
                {
                    Target.x = (int) (Math.random() * Grid.countW);
                    Target.y = (int) (Math.random() * Grid.countH);
                    
                    if(mover.isWall(Target.y,Target.x) ==  false)
                         break;
                }
                for(String key : pathfinders.keySet()){
                    if(agents.get(key).status){
                   int x = agents.get(key).posW;
                   int y = agents.get(key).posH;
                   pathfinders.get(key).clear();
                   pathfinders.get(key).initAlgorithm(x, y);
                   pathfinders.get(key).runAlgorithm();
                   
                }
                }
        }                         
           try {
               threadT.sleep(GameState.speed);
           } catch (InterruptedException ex) {
               Logger.getLogger(GameManager.class.getName()).log(Level.SEVERE, null, ex);
           }      
           repaint(); 
           gameTime += 0.5f;
         
       }
    }
    
   
    
   public void initGameState(){
       GameState.wallType = mover.randomInt(39);
       loadMapFromFile("map7.txt");
       player = new Player(4,1,GameState.playerX,GameState.playerY,true,true,true);
   }   
    private void enablePlayerMovement() {
        this.addKeyListener(new KeyAdapter() {
            @Override
            public void keyPressed(KeyEvent e) {
               int key = e.getKeyCode();
                if(key == KeyEvent.VK_ENTER){
                  System.out.println("\n"+ player.posW +" "+player.posH);
                   
                }
                if (key == KeyEvent.VK_LEFT  ||key == KeyEvent.VK_A){
                    if (player.posW > 0 && !mover.isWall(player.posH,player.posW-1)){
                    player.posW--;
                }}
                else if (key == KeyEvent.VK_RIGHT ||key == KeyEvent.VK_D){
                   if( player.posW < Grid.countW-1 && !mover.isWall(player.posH,player.posW+1)){
                    player.posW++;
                }
                } else if (key == KeyEvent.VK_UP ||key == KeyEvent.VK_W){
                    if(player.posH > 0 && !mover.isWall(player.posH - 1,player.posW))
                {    player.posH--;
                }
                }else if (key == KeyEvent.VK_DOWN ||key == KeyEvent.VK_S ){ if(player.posH < Grid.countH-1 && !mover.isWall(player.posH + 1,player.posW))
                {   player.posH++;
                }
                }
                repaint();
            }
        });     
   } 
   public void loadRandomMap(String fileName){
    
            GameState.playerX = 1;
            GameState.playerY = 1;
            Target.x = 1;
            Target.y = 1;
            
            
           RandomMap mapGenerator = new RandomMap(Grid.countW,Grid.countH);
            
            System.out.print("Target Fx " + Target.x + " " + Target.y );
            GameState.agentCount = mapGenerator.getAgentCount();
             int cells[][] = mapGenerator.createMap() ;
            GameState.agentPositions = mapGenerator.dirty(GameState.agentCount, cells);

            System.out.println("");
             System.out.println(mapGenerator.print(cells));
          Grid.cells = cells;
            
      
    }
      public void loadMapFromFile(String fileName){
        GameState.playerX = 1;
            GameState.playerY = 1;
            Target.x = 1;
            Target.y = 1;
            
            
           RandomMap mapGenerator = new RandomMap(Grid.countW,Grid.countH);
            
            System.out.print("Target Fx " + Target.x + " " + Target.y );
            GameState.agentCount = mapGenerator.getAgentCount();
            
            
            
             int cells[][] = null;
        try {
            BufferedReader bfr = new BufferedReader(new FileReader(fileName));
            String line  =  bfr.readLine() ;
            cells = new int[Integer.valueOf(line)][Integer.valueOf(line)];
            int i  = 0 , j=0 ;
            while((line = bfr.readLine())!=null){
            StringTokenizer token  = new StringTokenizer(line, " ");
            j=0 ;
            while(token.hasMoreTokens()) {
                cells[i][j] = Integer.valueOf(token.nextToken()) ;
              j++;
            } i++;
            }
        } catch (IOException  ex) {
            Logger.getLogger(GameManager.class.getName()).log(Level.SEVERE, null, ex);
        }
             
             
            GameState.agentPositions = mapGenerator.dirty(GameState.agentCount, cells);
          
            System.out.println("");
             Grid.cells = cells;
             System.out.println(mapGenerator.print(cells));
            
    }

	public void mouseClicked(MouseEvent e) {
		int x = e.getX();
		int y = e.getY();
		System.out.println("Mouse Clicked at X: " + x + " - Y: " + y);
                Rectangle res = new Rectangle(Grid.cellH*Grid.countW+50,Grid.cellH*Grid.countH-30 ,90,30);
               if(res.contains(x,y)){
                System.exit(1);
               }
        }

	@Override
	public void mouseEntered(MouseEvent e) {
		int x = e.getX();
		int y = e.getY();
		System.out.println("Mouse Entered frame at X: " + x + " - Y: " + y);
	}

	@Override
	public void mouseExited(MouseEvent e) {
		int x = e.getX();
		int y = e.getY();
		System.out.println("Mouse Exited frame at X: " + x + " - Y: " + y);
	}

	@Override
	public void mousePressed(MouseEvent e) {
		int x = e.getX();
		int y = e.getY();
		System.out.println("mousePressed X: " + x + " - Y: " + y);
	}

	@Override
	public void mouseReleased(MouseEvent e) {
		int x = e.getX();
		int y = e.getY();
		System.out.println("Mouse Released at X: " + x + " - Y: " + y);   
	}
  
}
