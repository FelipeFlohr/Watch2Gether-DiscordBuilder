package com.felipeflohr.seleniumw2g.view;

import java.awt.Color;
import java.awt.Font;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintStream;
import javax.swing.JFrame;
import javax.swing.JTextArea;

/**
 * A GUI Window which prints the console of the Thread #01
 * @author Felipe Matheus Flohr
 */
public class ConsoleGUI extends JFrame {
	private static final long serialVersionUID = 1L;

	private final JTextArea textArea;

	public ConsoleGUI() {
		if (Thread.currentThread().getId() == 1L) {
			this.textArea = new JTextArea();
			this.textArea.setEditable(false);
			this.textArea.setForeground(Color.BLACK);
			this.textArea.setFont(new Font(Font.MONOSPACED, Font.PLAIN, 12));
			this.textArea.setLineWrap(true);

			getPrintStream();

			// Add Components
			this.add(textArea);

			this.setLocationRelativeTo(null);
			this.setDefaultCloseOperation(EXIT_ON_CLOSE);
			this.setSize(800, 600);
			this.setTitle("Spring Application - Console");
			this.setVisible(true);
		} else {
			this.textArea = null;
		}
	}

	public PrintStream getPrintStream() {
		OutputStream outputStream = new OutputStream() {
			@Override
			public void write(int b) throws IOException {
				textArea.append(String.valueOf((char) b));
			}
		};
		
		PrintStream printStream = new PrintStream(outputStream);

		System.setOut(printStream);
		System.setErr(printStream);

		return printStream;
	}
}
