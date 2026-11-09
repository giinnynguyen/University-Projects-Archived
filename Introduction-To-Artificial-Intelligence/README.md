# Introduction to Artificial Intelligence

Java Swing game (main class `model.GameMain`). Requires **JDK 17+**.

## Run

```bash
./run.sh
```

The script compiles `src/` into `build/classes` and starts the game. Run another main class with
`./run.sh Testview.test`.

Images, sounds and `map*.txt` are loaded by relative path, so the working directory must be this
folder (`run.sh` and the VS Code launch config handle that).

- **VS Code**: install "Extension Pack for Java", open this folder, use *Run GameMain*.
- **NetBeans**: open this folder as a project (`nbproject/`), then Run.
