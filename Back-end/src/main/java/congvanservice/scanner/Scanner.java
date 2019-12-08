package congvanservice.scanner;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Scanner {
    //Lưu File
    //Scanner
    public static void imageToText(String src, String dst) throws IOException {
//        Example command
//        cmd /c cmd.exe /K \"tesseract C:\\Users\\HieuNghiem\\Desktop\\sample.png C:\\Users\\HieuNghiem\\Desktop\\sample.txt -l vie
//        cmd /c cmd.exe /K tesseract "G:\\Java\\Java Project\\CongVanService\\hinh-cong-van\\sample.png" "G:\\Java\\Java Project\\CongVanService\\hinh-cong-van\\sample" -l vie
        //Mặc định tesseract sẽ tự thêm .txt vào ouput
//        String command = "cmd /c cmd.exe /K tesseract "+"\""+src+"\""+" "+"\""+dst+"\""+" -l vie";
        String command = "cmd /c cmd.exe /K tesseract "+"\""+src+"\""+" "+"\""+dst+"\""+" -l vie";
        Runtime.getRuntime()
                .exec(command);
    }
    public static void imageToPDF(String src, String dst) throws IOException, InterruptedException {
//        Example command
//        tesseract -l vie "G:\\Java\\Java Project\\CongVanService\\hinh-cong-van\\sample.png" "G:\\Java\\Java Project\\CongVanService\\hinh-cong-van\\sample" pdf
//        String command = "cmd /C start /wait tesseract -l vie "+"\""+src+"\""+" "+"\""+dst+"\""+" pdf";
//        About 1.8s
        String command = "tesseract -l vie "+"\""+src+"\""+" "+"\""+dst+"\""+" pdf";
        Process p = Runtime.getRuntime()
                .exec(command);
        p.waitFor();
//        int result = p.exitValue();

    }

}
