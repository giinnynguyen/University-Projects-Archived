
package model;
import java.awt.*;
import java.awt.event.*;

import java.io.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.*;
import Testview.Mypanel;
import media.media;



class GameState
{
    static int [][] agentPositions;
    static int agentCount;
    static int playerX, playerY;
    static int allyScore = 0 , enemyScore = 0;
    static int wallType;
    static int speed  = 500;
} 

class Grid{
    static int cellW = 32;
    static int cellH = 32;
    static int countW = 19;
    static int countH = 19;
    
    static int extraWidth = 200;
    static int [][] cells;
}


public class GameMain extends JFrame implements  MouseListener{
    Mypanel movex = new Mypanel();
    Mypanel movey = new Mypanel();
     Container cp = this.getContentPane();
        GameManager gm = new GameManager();
     public GameMain(){
        addMouseListener(this);
        initComponents();
        initEvents();
        initWindow();
    }
     private void initComponents() {
       
        
     
        gm.setFocusable(true);
        this.setLayout(new BorderLayout());   
           
          initMoveLayer();
        
        cp.add(gm, BorderLayout.CENTER);
         cp.add(movex, BorderLayout.WEST);
         cp.add(movey, BorderLayout.NORTH);
    }
     public void initMoveLayer(){
           movex.setOpaque(false);           
           movey.setOpaque(false);
           movex.setPreferredSize(new Dimension(200, 0));
           movey.setPreferredSize(new Dimension(0, 80));
     }
     public  void setMoveLayer(int w, int h ){
     
         movex.setPreferredSize(new Dimension(w, 0));
         movey.setPreferredSize(new Dimension(0, h));
         cp.revalidate();
        
         
         
     }
     private void initEvents() {
    }  
    private void initWindow() {
         this.setUndecorated(true);
   
       this.setExtendedState(JFrame.MAXIMIZED_BOTH); 
       this.setBackground(new Color(0, 0, 0, 0));
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        this.setVisible(true);
              
    }
    public static void main(String[] args) throws FileNotFoundException, IOException {
        final MoveRandom mover = new MoveRandom();
        int music = mover.randomInt(3);
        media.play("media/wind.wav");
                System.out.print(GameState.enemyScore +" -----------------------");
            javax.swing.Timer timer = new javax.swing.Timer(70000, new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                GameState.wallType = mover.randomInt(2);
                media.play("media/wind.wav");
            }
        }); 
        timer.start();   
                 
           new GameMain();
    }

 @Override
	public void mouseClicked(MouseEvent e) {
		
	}

	@Override
	public void mouseEntered(MouseEvent e) {
		
	}

	@Override
	public void mouseExited(MouseEvent e) {
		
	}

	@Override
	public void mousePressed(MouseEvent e) {
		int x = e.getX();
		int y = e.getY();
                setCursor(Cursor.getPredefinedCursor(Cursor.MOVE_CURSOR));
				repaint();
	}

	@Override
	public void mouseReleased(MouseEvent e) {
		int x = e.getX();
		int y = e.getY();
                setMoveLayer(x, y);
                        repaint();
	}
   
}