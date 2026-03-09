
package com.example.voice;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin("*")
public class VoiceController {

    @PostMapping("/detect")
    public String detect(@RequestParam("file") MultipartFile file){

        // Temporary demo response
        return "Audio received: " + file.getOriginalFilename() +
               " (Model prediction will appear here)";
    }

}
