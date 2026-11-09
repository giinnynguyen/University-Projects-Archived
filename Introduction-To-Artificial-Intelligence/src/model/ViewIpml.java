
package model;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.imageio.ImageIO;
public class ViewIpml extends View{
    private BufferedImage image, wall , background , wing ,scoreboard ;
    public ViewIpml (){
 
    }
    @Override
    public void Draw(Graphics g) {          
        for (int i = 0; i < Grid.countH; i++) {
            for (int j = 0; j < Grid.countW; j++) {
                int x = j * Grid.cellW;
                int y = i * Grid.cellH;
                try {                  
                         background = ImageIO.read(new File("grass1.png"));
                           g.drawImage(background, x, y, Grid.cellW, Grid.cellH, null);
                    } catch (IOException ex) {
                        Logger.getLogger(ViewIpml.class.getName()).log(Level.SEVERE, null, ex);
                    }
                if( Grid.cells[i][j] == 1){              
                    try {
                        wall = ImageIO.read(new File("wall2.png"));
                } catch (IOException ex) {
                    Logger.getLogger(ViewIpml.class.getName()).log(Level.SEVERE, null, ex);
                }
                    g.drawImage(wall, x, y,32,32, null);
                }
                else if( Grid.cells[i][j] == 0  ){
                    
                }
            }
        }
         
       
       BufferedImage logout = null ;
        try {
            wing = ImageIO.read(new File("Angle.png"));
            logout = ImageIO.read(new File("effects/out.png"));
        } catch (IOException ex) {
            Logger.getLogger(ViewIpml.class.getName()).log(Level.SEVERE, null, ex);
        }
        g.drawImage(wing, Grid.cellH*Grid.countW,340 , null);
        
        
        
        
        g.drawImage(logout, Grid.cellH*Grid.countW+50,Grid.cellH*Grid.countH-32 , null);
        
        
        
        
        
        
        g.setColor(Color.WHITE);
        g.setFont(new Font("Serif", Font.PLAIN, 35));
        try {
                 scoreboard = ImageIO.read(new File("scoreboard.png"));
                    g.drawImage(scoreboard,Grid.cellH*Grid.countW, 170, null);
                    g.setColor(Color.BLACK);
                    g.drawString(""+ GameState.allyScore,Grid.cellH*Grid.countW + 250, 300);
                   g.drawString(""+ GameState.enemyScore,Grid.cellH*Grid.countW+250, 340);
        } catch (IOException ex) {
            Logger.getLogger(ViewIpml.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        
    }
    
   

}

