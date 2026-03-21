
// // package com.example.voice;

// // import org.springframework.web.bind.annotation.*;
// // import org.springframework.web.multipart.MultipartFile;

// // @RestController
// // @CrossOrigin("*")
// // public class VoiceController {

// //     @PostMapping("/detect")
// //     public String detect(@RequestParam("file") MultipartFile file){

// //         // Temporary demo response
// //         return "Audio received: " + file.getOriginalFilename() +
// //                " (Model prediction will appear here)";
// //     }

// // }
// package com.example.voice;

// import java.io.BufferedReader;
// import java.io.File;
// import java.io.InputStreamReader;

// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;
// import org.springframework.web.multipart.MultipartFile;

// @RestController
// @CrossOrigin("*")
// public class VoiceController {

//     @PostMapping("/detect")
//     public String detect(@RequestParam("file") MultipartFile file){

//         try{

//             // 1️⃣ Save uploaded file
//             String uploadDir = "uploads/";
//             File dir = new File(uploadDir);
//             if(!dir.exists()){
//                 dir.mkdirs();
//             }

//             String filePath = uploadDir + file.getOriginalFilename();
//             File dest = new File(filePath);
//             file.transferTo(dest);


//             // 2️⃣ Call Python script
//             ProcessBuilder pb = new ProcessBuilder(
//                     "python",
//                     "ml-model/predict.py",
//                     filePath
//             );

//             Process process = pb.start();


//             // 3️⃣ Read Python output
//             BufferedReader reader = new BufferedReader(
//                     new InputStreamReader(process.getInputStream())
//             );

//             String result = reader.readLine();


//             // 4️⃣ Convert result
//             if(result.equals("0")){
//                 return "REAL VOICE";
//             }else{
//                 return "FAKE VOICE";
//             }

//         }catch(Exception e){
//             e.printStackTrace();
//             return "Error processing audio";
//         }
//     }
// }

// package com.example.voice;

// import java.io.BufferedReader;
// import java.io.File;
// import java.io.InputStreamReader;

// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;
// import org.springframework.web.multipart.MultipartFile;

// @RestController
// @CrossOrigin("*")
// public class VoiceController {

//     @PostMapping("/detect")
//     public String detect(@RequestParam("file") MultipartFile file) {

//         try {

//             File tempFile = File.createTempFile("audio_", ".wav");
//             file.transferTo(tempFile);

//             ProcessBuilder pb = new ProcessBuilder(
//                 "C:\\Users\\KIIT0001\\anaconda3\\envs\\hybrid_env\\python.exe",
//                 "C:\\Users\\KIIT0001\\Downloads\\deepfake_voice_project\\ml-model\\predict_hybrid.py",
//                 tempFile.getAbsolutePath()
//             );

//             pb.redirectErrorStream(true);

//             Process process = pb.start();

//             BufferedReader reader = new BufferedReader(
//                 new InputStreamReader(process.getInputStream())
//             );

//            String line;
//            String jsonOutput = "";

//          while ((line = reader.readLine()) != null) {
//             System.out.println("Python: " + line);

//     // ✅ capture ONLY JSON line
//     if (line.trim().startsWith("{") && line.trim().endsWith("}")) {
//         jsonOutput = line;
//     }
// }

// return jsonOutput;

//             process.waitFor();
//             tempFile.delete();

//             // ✅ RETURN JSON
//             return output.toString();

//         } catch (Exception e) {
//             e.printStackTrace();
//             return "{\"error\":\"Error processing audio\"}";
//         }
//     }
// }




package com.example.voice;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin("*")
public class VoiceController {

    @PostMapping("/detect")
    public String detect(@RequestParam("file") MultipartFile file) {

        try {

            File tempFile = File.createTempFile("audio_", ".wav");
            file.transferTo(tempFile);

            ProcessBuilder pb = new ProcessBuilder(
                "C:\\Users\\KIIT0001\\anaconda3\\envs\\hybrid_env\\python.exe",
                "C:\\Users\\KIIT0001\\Downloads\\deepfake_voice_project\\ml-model\\predict_hybrid.py",
                tempFile.getAbsolutePath()
            );

            pb.redirectErrorStream(true);

            Process process = pb.start();

            BufferedReader reader = new BufferedReader(
                new InputStreamReader(process.getInputStream())
            );

            String line;
            String jsonOutput = "";

            while ((line = reader.readLine()) != null) {
                System.out.println("Python: " + line);

                // ✅ capture ONLY JSON line
                if (line.trim().startsWith("{") && line.trim().endsWith("}")) {
                    jsonOutput = line;
                }
            }

            process.waitFor();   // ✅ WAIT FIRST
            tempFile.delete();  // ✅ CLEAN FILE

            return jsonOutput;  // ✅ RETURN JSON ONLY

        } catch (Exception e) {
            e.printStackTrace();
            return "{\"error\":\"Error processing audio\"}";
        }
    }
}