package model;
import java.util.ArrayList;
public class AStar {
    private Node start;
    private Node target;
    private Node cursor;
    private Node parentCursor;
    private Node[][] nodeList;

    public AStar(int startX, int startY) {
        initAlgorithm(startX, startY);
    }

    public void runAlgorithm() {
        calculatePath();
        linkChildren();
    }

    public void initAlgorithm(int startX, int startY) {
        nodeList = new Node[Grid.countH][Grid.countW];
        for (int i = 0; i < Grid.countH; i++) {
            for (int j = 0; j < Grid.countW; j++) {
                nodeList[i][j] = new Node(i, j).setX(i * Grid.countH).setY(j * Grid.countW);
            }
        }
        start = nodeList[startX][startY];
        target = nodeList[Target.x][Target.y];
        for (int i = 0; i < Grid.countH; i++) {
            for (int j = 0; j < Grid.countW; j++) {
                nodeList[i][j].calcH(target, 1);
                if (Grid.cells[i][j] == 1) {
                    nodeList[i][j].setWall(true);
                } else {
                    nodeList[i][j].setWall(false);
                }
            }
        }

        cursor = start;
    }

    public void linkChildren() {
        cursor = target;
        parentCursor = target;
        while (parentCursor != start) {
            parentCursor = cursor.getParent();
            if (parentCursor != null) {
                parentCursor.setChildren(cursor);
                cursor = parentCursor;
            } else {
                cursor = null;
                break;
            }
        }
        cursor = start;
    }

    public void clear() {
        start = null;
        target = null;
        cursor = null;
        for (int i = 0; i < Grid.countH; i++) {
            for (int j = 0; j < Grid.countW; j++) {
                nodeList[i][j].clear();
            }
        }
    }

    public void resetNode() {
        target = null;
        start = null;
        for (int i = 0; i < Grid.countH; i++) {
            for (int j = 0; j < Grid.countW; j++) {
                nodeList[i][j] = new Node(i, j).setX(i * Grid.cellW).setY(j * Grid.cellH);
            }
        }
    }


    public void calculatePath() {
        ArrayList<Node> closed = new ArrayList<Node>();
        ArrayList<Node> open = new ArrayList<Node>();
        Node currentNode = start;
          open.add(currentNode);
        while (open.isEmpty() != true) { 
            open.remove(currentNode);
            closed.add(currentNode);
            if (currentNode == target) {
                break;
            }
            for (int i = currentNode.getFX() - 1; i <= currentNode.getFX() + 1; i++) {    
                if (i < 0 || i > Grid.countH - 1) {
                    continue;
                }
                for (int j = currentNode.getFY() - 1; j <= currentNode.getFY() + 1; j++) {
                    if (j < 0 || j > Grid.countW - 1) {
                        continue;
                    }
                    if (i != currentNode.getFX() && j != currentNode.getFY()) {
                        continue;
                    }
                    if (i == currentNode.getFX() && j == currentNode.getFY()) {
                        continue;
                    }
                    if (nodeList[j][i].isWall())
                    {
                        continue;
                    }
                    Node node = nodeList[i][j];

                    if (!open.contains(node) && !closed.contains(node)) {
                        node.setG(node.calcG(currentNode));
                        node.setF(node.getF());
                        node.setParent(currentNode);
                         open.add(node);
                    } else if (open.contains(node)) {
                        if (node.getG() > node.calcG(currentNode)) {
                            node.setG(node.calcG(currentNode));
                            node.setF(node.getF());
                            node.setParent(currentNode);
                        }
                    } else if (closed.contains(node)) {
                        if (node.getG() > node.calcG(currentNode)) {
                            node.setG(node.calcG(currentNode));
                            node.setF(node.getF());
                            node.setParent(currentNode);
                            closed.remove(node);
                            open.add(node);
                        }
                    }
                }
            }
            currentNode = minOfList(open);
        }
    }

    public Node minOfList(ArrayList<Node> open) {

        Node n = open.get(0);
        for (Node node : open) {
            if (node.getF() < n.getF()) {
                n = node;
            }
        }
        return n;
    }

    public Node getStart() {
        return start;
    }

    public Node getTarget() {
        return target;
    }

    public Node getCursor() {
        return cursor;
    }

    public Node getParentCursor() {
        return parentCursor;
    }

    public void setStart(Node start) {
        this.start = start;
    }

    public void setTarget(Node target) {
        this.target = target;
    }

    public void setCursor(Node cursor) {
        this.cursor = cursor;
    }

    public void setParentCursor(Node parentCursor) {
        this.parentCursor = parentCursor;
    }

    public void setNodeList(Node[][] nodeList) {
        this.nodeList = nodeList;
    }

    public Node[][] getNodeList() {
        return nodeList;
    }
}
