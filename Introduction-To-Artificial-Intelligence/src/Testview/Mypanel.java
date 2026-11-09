package Testview;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.geom.Area;
import javax.swing.JPanel;
public class Mypanel extends JPanel {
	Image backgound;
	   public Mypanel() {
	}
	 
	@Override
	protected void paintComponent(Graphics g) {
		super.paintComponent(g);	
		if (backgound != null) {
			g.drawImage(backgound, 0, 0, null);
		}
                	Graphics2D g2d = (Graphics2D) g.create();
		g2d.setColor(new Color(0, 0, 0, 170));
		Area fill = new Area(new Rectangle(new Point(0, 0), getSize()));
                
		g2d.fill(fill);
		g2d.dispose();
}
	public void setBackGound(Image img) {
		backgound = img;
		repaint();
	}
}