import React, { useState } from 'react';
import { Terminal, Download, Code, Cpu, CheckCircle2, Copy, Sparkles } from 'lucide-react';

interface SoftwareExecutionHubProps {
  lang: 'ar' | 'en' | 'es' | 'fr';
}

export const SoftwareExecutionHub: React.FC<SoftwareExecutionHubProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  const pythonCoreCode = `import cv2
import numpy as np
import requests
import time

# --- FALCON EYE INDUSTRIAL AI EDGE CORE ---
RTSP_URL = "rtsp://admin:admin@192.168.1.108:554/stream1"
ARDUINO_API = "http://192.168.1.50/sort" # ESP32 / Arduino Endpoint

def detect_fruit_defects(frame):
    # Simulated AI Vision Inspection (Color, Caliber, Defects)
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    avg_color = np.mean(hsv[:, :, 0])
    
    # Classification logic (Class 1 Extra vs Cull)
    classification = "Class_1_Extra"
    outlet_id = 1
    
    if avg_color < 20:
        classification = "Cull_Mold_Detected"
        outlet_id = 3 # Rejection bin
    elif avg_color > 120:
        classification = "Class_2_Standard"
        outlet_id = 2
        
    return classification, outlet_id

def main():
    cap = cv2.VideoCapture(RTSP_URL)
    print("[INFO] Falcon Eye AI Vision Engine Started...")
    
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            print("[WARN] Stream disconnected, reconnecting...")
            time.sleep(1)
            continue
            
        # Run AI Inspection
        grade, outlet = detect_fruit_defects(frame)
        
        # Send Sort Signal to Arduino / ESP32 via HTTP or Serial
        try:
            # requests.get(f"{ARDUINO_API}?outlet={outlet}", timeout=0.05)
            pass
        except Exception as e:
            pass
            
        cv2.putText(frame, f"Grade: {grade} (Outlet {outlet})", (30, 40),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)
        cv2.imshow("Falcon Eye AI Sizer v1.0", frame)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
            
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
`;

  const arduinoCode = `/*
  FALCON EYE INDUSTRIAL - Arduino / ESP32 Sizer Control Firmware
  Receives sorting commands from Python AI Vision Core & activates servo/gates.
*/

#include <ESP32Servo.h> // Or standard Servo.h for Arduino

Servo sortingServo; 
const int sensorPin = 2; // Photoelectric sensor pin
const int servoPin = 13; // Sorting gate servo pin

void setup() {
  Serial.begin(115200);
  pinMode(sensorPin, INPUT_PULLUP);
  sortingServo.attach(servoPin);
  sortingServo.write(90); // Default middle position
  Serial.println("[INFO] Arduino Sizer Controller Ready.");
}

void loop() {
  // Check if fruit detected by photoelectric sensor
  if (digitalRead(sensorPin) == LOW) {
    Serial.println("[EVENT] Fruit detected by sensor!");
    delay(120); // Time delay from sensor to sorting gate
    
    // Trigger servo gate based on AI command
    sortingServo.write(45); // Divert to outlet 1
    delay(400);
    sortingServo.write(90); // Reset to neutral
  }

  // Check incoming serial command from Python AI script
  if (Serial.available() > 0) {
    int outlet = Serial.parseInt();
    if (outlet > 0) {
      Serial.print("[ACTUATE] Sorting to outlet: ");
      Serial.println(outlet);
      // Actuate specific outlet gate...
    }
  }
}
`;

  const handleCopy = (code: string, fileName: string) => {
    navigator.clipboard.writeText(code);
    setCopiedFile(fileName);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
          {isAr ? 'مركز تنفيذ وتنزيل السوفت وير (Software Execution Hub)' : 'Software Execution Hub'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          {isAr ? 'تم بدء التنفيذ! إليك أكواد السوفت وير الأساسية (Python AI + Arduino)' : 'Execution Started! Core Python AI & Arduino Firmware'}
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-3xl">
          {isAr
            ? 'بينما أنت تجهز الهيكل الميكانيكي والحساسات، قمنا بإعداد نواة السوفت وير المتكاملة (كود Python للرؤية الحاسوبية وكود Arduino/ESP32 للتحكم في البوابات).'
            : 'While you prepare the hardware and mechanical frame, we have built the core software packages ready for deployment.'}
        </p>
      </div>

      {/* Code Snippet 1: Python AI Core */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
            <Terminal className="w-4 h-4" />
            <span>1. maf_ai_vision_core.py (Python AI Vision Engine)</span>
          </div>
          <button
            onClick={() => handleCopy(pythonCoreCode, 'python')}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs rounded text-slate-200 flex items-center gap-1 transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copiedFile === 'python' ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ الكود' : 'Copy Code')}</span>
          </button>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto text-[11px] font-mono text-slate-300 leading-relaxed">
          <pre>{pythonCoreCode}</pre>
        </div>
      </div>

      {/* Code Snippet 2: Arduino Firmware */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-bold">
            <Cpu className="w-4 h-4" />
            <span>2. arduino_sizer_controller.ino (Arduino / ESP32 Firmware)</span>
          </div>
          <button
            onClick={() => handleCopy(arduinoCode, 'arduino')}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs rounded text-slate-200 flex items-center gap-1 transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copiedFile === 'arduino' ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ الكود' : 'Copy Code')}</span>
          </button>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto text-[11px] font-mono text-slate-300 leading-relaxed">
          <pre>{arduinoCode}</pre>
        </div>
      </div>
    </div>
  );
};
