package congvanservice.scanner;

import congvanservice.controllers.FileController;
import org.apache.pdfbox.io.MemoryUsageSetting;
import org.apache.pdfbox.multipdf.PDFMergerUtility;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.IOException;
import java.util.List;

public class MergePDF {
    private static final Logger logger = LoggerFactory.getLogger(MergePDF.class);
    public void mergePDFFiles(List<File> files, String mergedFileName) {
        try {
            PDFMergerUtility merger = new PDFMergerUtility();
            for (File file : files) {
                PDDocument document = PDDocument.load(file);
                merger.setDestinationFileName(mergedFileName);
                merger.addSource(file);
                merger.mergeDocuments(MemoryUsageSetting.setupTempFileOnly());
                document.close();
            }
        } catch (IOException e) {
            logger.error("Error to merge files. Error: " + e.getMessage());
        }
    }
}
