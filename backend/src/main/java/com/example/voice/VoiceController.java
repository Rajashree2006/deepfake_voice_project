
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

package com.example.voice;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.BufferedReader;
import java.io.InputStreamReader;

@RestController
@CrossOrigin("*")
public class VoiceController {

    @PostMapping("/detect")
    public String detect(@RequestParam("file") MultipartFile file) {

        try {

            // 1️⃣ Create temporary file
            File tempFile = File.createTempFile("audio_", ".wav");

            // 2️⃣ Save uploaded audio to temp file
            file.transferTo(tempFile);

            // 3️⃣ Run Python model
            ProcessBuilder pb = new ProcessBuilder(
                    "python",
                    "../ml-model/predict.py",
                    tempFile.getAbsolutePath()
            );

            pb.redirectErrorStream(true);

            Process process = pb.start();

            // 4️⃣ Read Python output
            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream())
            );

            // String result = reader.readLine();
            String line;
String result = "";

while ((line = reader.readLine()) != null) {
    System.out.println("Python: " + line);
    result = line;   // last line should be prediction
}

            process.waitFor();

            // 5️⃣ Delete temp file
            tempFile.delete();

            // 6️⃣ Return prediction
            if ("0".equals(result)) {
                return "REAL VOICE";
            } else if ("1".equals(result)) {
                return "FAKE VOICE";
            } else {
                return "Prediction Error";
            }

        } catch (Exception e) {
            e.printStackTrace();
            return "Error processing audio";
        }
    }
}