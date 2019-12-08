package congvanservice.scanner;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.pdfbox.text.PDFTextStripperByArea;

import java.io.File;
import java.io.IOException;

public class ReadPDF {
    public static String readPDF(String src) {
        String pdfFileInText = "File not exist or cannot upload pdf to read";
        try {
            PDDocument document = PDDocument.load(new File(src));
            if (!document.isEncrypted()) {
                PDFTextStripperByArea stripper = new PDFTextStripperByArea();
                stripper.setSortByPosition(true);
                PDFTextStripper tStripper = new PDFTextStripper();
                pdfFileInText = tStripper.getText(document);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return pdfFileInText;
    }
}
