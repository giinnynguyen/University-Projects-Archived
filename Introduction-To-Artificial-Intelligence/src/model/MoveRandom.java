
package model;

import java.util.Vector;


public class MoveRandom {
    public MoveRandom(){
        
    }
    
     public int randomInt(int range){
       int value;
       value = 1 + (int) (Math.random()*range);
       return value;
   }
   
    
    
    public boolean isWall(int x,int y){
      if( x < 0 || x > Grid.countH - 1 || y < 0 || y > Grid.countW - 1)
          return true;
      else if(Grid.cells[x][y] == 0)
          return false;
      else 
          return true;
      
   }
    
    public int findValidDirection(int x,int y){
       Vector a = new Vector();
       int w = 0;
       if(!isWall(y , x + 1)){
           a.add(1);
           w ++ ;
       }
       if(!isWall(y + 1 , x)){
          a.add(2);
          w ++;
       }    
       if(!isWall( y, x -1 )){
           a.add(3);
           w ++;
       }
       if(!isWall( y-1 , x)){
           a.add(4);
           w ++;
       }
 
       int index = (int) (Math.random()* w);
       return (int) a.elementAt(index);
   }
   
    public boolean isSamePosition(int x, int y, int x1, int y1)
    {
        if( x == x1 && y == y1)
            return true;
        return false;
    }        
}
