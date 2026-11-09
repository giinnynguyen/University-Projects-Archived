package media;

import java.io.File;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.Clip;
import javax.sound.sampled.LineEvent;

public class media {

    public static void play(String path) {
        try {
            AudioInputStream ais = AudioSystem.getAudioInputStream(new File(path));
            Clip clip = AudioSystem.getClip();
            clip.addLineListener(e -> {
                if (e.getType() == LineEvent.Type.STOP) {
                    clip.close();
                }
            });
            clip.open(ais);
            clip.start();
        } catch (Exception ex) {
            Logger.getLogger(media.class.getName()).log(Level.SEVERE, "Cannot play " + path, ex);
        }
    }

    public void playAllyScoreSound() {
        play("media/score.wav");
    }

    public void playEnemyScoreSound() {
        play("media/score2.wav");
    }

    public void playAllyLevelUpSound() {
        play("media/ally_level_up.wav");
    }

    public void playEnemyLevelUpSound() {
        play("media/enemy_level_up.wav");
    }

    public static void main(String[] a) throws InterruptedException {
        new media().playAllyScoreSound();
        Thread.sleep(3000);
    }
}
