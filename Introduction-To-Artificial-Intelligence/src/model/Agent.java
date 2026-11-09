package model;

import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.imageio.ImageIO;


public class Agent extends View {
    public int posW;
    public int posH;
    public boolean isPlayer;
    public boolean isAlly;
       
    public int randomSteps;
    public int direction;
    public boolean  status  = false ;
    private BufferedImage enemyImg, allyImg ,playerImg, targetImg ;
    Random random = new Random();
    private  int SPRITE_ROWS = 5;
    private  int SPRITE_COLUMNS = 4;
    private  int DELAY = 250;

    private int DIM_W;
    private int DIM_H;

    private int x1Src;
    private int y1Src;
    private int x2Src;
    private int y2Src;

    private BufferedImage img;
    private int  lastH ;
    private int  lastW  ;
    String action  ; 
    int levelGhost = 1 ;
    public Agent(int randomSteps,int direction,int posW,int posH , boolean isPlayer, boolean isAlly , boolean status) { 
        this.randomSteps = randomSteps;
        this.direction= direction;
        this.posW = posW;
        this.posH = posH;
        this.isPlayer = isPlayer;
        this.isAlly = isAlly;
        
        this.lastH =  posH ;
        this.lastW = posW ;
        this.action = "w" ;
        
        
        this.status = status ;
        
        if(isPlayer){
            SPRITE_ROWS = 5;
            SPRITE_COLUMNS = 4;
         try {
            img = ImageIO.read(new File("man2.png"));
        } catch (IOException ex) {
            
        }
        }else{
             SPRITE_ROWS = 3;
            SPRITE_COLUMNS = 4;
            if(isAlly) {
            try {
            img = ImageIO.read(new File("effects/ally.png"));
        } catch (IOException ex) {
        }
            }else{
         try {
            img = ImageIO.read(new File("effects/ghost1.png"));
        } catch (IOException ex) {
        }
        }
        }
        DIM_W = img.getWidth() / SPRITE_ROWS;
        DIM_H = img.getHeight() / SPRITE_COLUMNS;
        y1Src = 0;
        x2Src = x1Src + DIM_W;
        y2Src = y1Src + DIM_H ;
        javax.swing.Timer timer = new javax.swing.Timer(DELAY, new ActionListener() {
          
            public void actionPerformed(ActionEvent e) {
               
                  if (x1Src >= img.getWidth() - DIM_H - 5) {
                    x1Src = 0;
                    x2Src = x1Src + DIM_W;
                      
                   } else {
                    x1Src += DIM_W;
                    x2Src = x1Src + DIM_W;
                   }
                 
             
            }
        });
        timer.start();
    }
     public  void updateAgentSprite(int prevW , int prevH ,int w ,int  h) {
        String event = check(prevW, prevH, w, h) ;
       if(!action.equals(event)){
         if(event.equals("w")){
                    y1Src = + DIM_H +DIM_H+DIM_H ;
                    y2Src = y1Src + DIM_H ;
                     action ="w" ;
              } else
             if(event.equals("d")){
              y1Src = +DIM_H +DIM_H;
                    y2Src = y1Src + DIM_H ;
                     action ="d" ;       
             }else
                 if(event.equals("s")){                     
                     y1Src = 0;
                     y2Src = y1Src + DIM_H ;         
                     action ="s" ;
                 }else
                     if(event.equals("a")) {
                       y1Src = + DIM_H;
                    y2Src = y1Src + DIM_H ;
                     action ="a" ;
                     }
        }
    }
    public  void updatePlayerSprite(int prevW , int prevH ,int w ,int  h) {
        String event = check(prevW, prevH, w, h) ;
       if(!action.equals(event)){
         if(event.equals("w")){
             y1Src = 0;
             y2Src = y1Src + DIM_H ;         
             action ="w" ;
         } else
             if(event.equals("d")){
                y1Src = + DIM_W;
                    y2Src = y1Src + DIM_H ;
                     action ="d" ;
             }else
                 if(event.equals("s")){
                    y1Src = +DIM_H +DIM_W;
                    y2Src = y1Src + DIM_H ;
                     action ="s" ;
                 }else
                     if(event.equals("a")) {
                   y1Src = + DIM_W +DIM_W+DIM_W;
                    y2Src = y1Src + DIM_H ;
                     action ="a" ;
                     }
        }
    }
    public String  check(int prevW , int prevH ,int w ,int  h) {
       if(w ==prevW && h!=lastH) {
         if(h <= prevH){
          return "w" ;
         }else{
          return  "s" ;
         }
       }
       if(h == prevH && w!=prevW){
         if(w<= prevW) {
          return  "a" ;
         }else{
          return  "d" ;
         }
       }
       return "underfound" ;
    }
    public static BufferedImage drop(BufferedImage img, int x1Src, int  y1Src,int  x2Src,int y2Src) { 
         int w = 300 ;
         int h  = 250 ;
    BufferedImage dimg = new BufferedImage(w,h, BufferedImage.TYPE_INT_ARGB);
    Graphics2D g2d = dimg.createGraphics();
    g2d.drawImage(img, 0, 0, w, h, x1Src, y1Src, x2Src, y2Src, null);
    g2d.dispose();
    return resize(dimg, 32, 32);
}  
    public static BufferedImage drop2(BufferedImage img, int x1Src, int  y1Src,int  x2Src,int y2Src) { 
         int w = img.getWidth()/5 ;
         int h  = img.getHeight()/4 ;
    BufferedImage dimg = new BufferedImage(w,h, BufferedImage.TYPE_INT_ARGB);
    Graphics2D g2d = dimg.createGraphics();
    g2d.drawImage(img, 0, 0, w, h, x1Src, y1Src, x2Src, y2Src, null);
    g2d.dispose();
    return dimg;
}  
   public static BufferedImage resize(BufferedImage img, int newW, int newH) { 
    Image tmp = img.getScaledInstance(newW, newH, Image.SCALE_SMOOTH);
    BufferedImage dimg = new BufferedImage(newW, newH, BufferedImage.TYPE_INT_ARGB);

    Graphics2D g2d = dimg.createGraphics();
    g2d.drawImage(tmp, 0, 0, null);

    return dimg;
   }   

    @Override
    public void Draw(Graphics g){
        if(isPlayer){
            updatePlayerSprite(lastW, lastH, posW, posH);
            lastH = posH ;
            lastW =posW ;
           
            g.drawImage(drop(img, x1Src, y1Src, x2Src, y2Src), posW *Grid.cellW, posH * Grid.cellH, null);
           g.drawImage(drop2(img, x1Src, y1Src, x2Src, y2Src),Grid.cellW*Grid.countW +65, 100, null);

       }    
        else if(isAlly == false){ 
            
             updateAgentSprite(lastW, lastH, posW, posH);
            lastH = posH ;
            lastW =posW ;
            g.drawImage(drop(img, x1Src, y1Src, x2Src, y2Src), posW *Grid.cellW,posH * Grid.cellH, null);
        } 
        else if(isAlly == true ){ 
              updateAgentSprite(lastW, lastH, posW, posH);
             lastH = posH ;
            lastW =posW ;
              g.drawImage(drop(img, x1Src, y1Src, x2Src, y2Src), posW *Grid.cellW, posH * Grid.cellH, null);
           }
     
           
        
     
   
       
    }  
      public void setImageLevel(BufferedImage img){
        this.img = img;
      }

    void upgradeGhostImage() {
        levelGhost++;
        if(levelGhost>6){
         levelGhost=6;
        }
        try {
            img = ImageIO.read(new File("effects/ghost"+levelGhost+".png"));
        } catch (IOException ex) {
            Logger.getLogger(Agent.class.getName()).log(Level.SEVERE, null, ex);
        }
    } 
}