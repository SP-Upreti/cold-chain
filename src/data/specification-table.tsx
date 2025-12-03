export const specificationData = {
  "Camera": {
    "MaxResolution": "2 MP",
    "Sensor": "1/2.9\" CMOS",
    "MinIllumination": "Colour: 0.01 lux (F2.0, AGC ON), 0 lux with IR on",
    "DayNight": "IR-cut filter with auto switch (ICR)",
    "Shutter": "Auto/Manual, 1 ~ 1/100000s",
    "AdjustmentAngle": "Pan: 0° ~ 355°, Tilt: 0° ~ 75°",
    "S/N": ">52 dB",
    "WDR": "DWDR"
  },
  "Lens": {
    "FocalLength": "2.8 mm",
    "IrisType": "Fixed",
    "Iris": "F2.0",
    "FieldOfView": {
      "Horizontal": "101.1°",
      "Vertical": "56.5°",
      "Diagonal": "117°"
    }
  },
  "DORI": {
    "Lens": "2.8 mm",
    "Detect": "45.0 m (147.6 ft)",
    "Observe": "18.0 m (59.1 ft)",
    "Recognize": "9.0 m (29.5 ft)",
    "Identify": "4.5 m (14.8 ft)"
  },
  "Illuminator": {
    "SupplementalLight": "IR",
    "IlluminationDistance": "30 m (98.4 ft)",
    "Wavelength": "850 nm",
    "IRControl": "Auto/Manual"
  },
  "Video": {
    "VideoCompression": ["Ultra 265", "H.265", "H.264"],
    "H264Profile": ["Baseline", "Main", "High"],
    "FrameRate": {
      "MainStream": ["2MP (1920x1080), Max 30fps", "720P (1280x720), Max 30fps"],
      "SubStream": [
        "D1 (720x576), Max 30fps",
        "640x360, Max 30fps",
        "2CIF (704x288), Max 30fps",
        "CIF (352x288), Max 30fps"
      ]
    },
    "VideoBitRate": "128 Kbps to 6144 Kbps",
    "UCode": "Support (Main stream)",
    "OSD": "Up to 4 OSDs",
    "PrivacyMask": "Up to 4 areas",
    "ROI": "Support",
    "VideoStream": "Dual Streams"
  },
  "Image": {
    "WhiteBalance": ["Auto", "Outdoor", "Fine Tune", "Sodium Lamp", "Locked", "Auto2"],
    "DigitalNoiseReduction": "2D/3D DNR",
    "SmartIR": "Support",
    "Flip": ["Normal", "Flip Vertical", "Flip Horizontal", "180°"],
    "Dewarping": "N/A",
    "HLC": "Support",
    "BLC": "Support",
    "Defog": "Digital Defog"
  },
  "Events": {
    "BasicDetection": ["Motion Detection", "Audio Detection"],
    "GeneralFunctions": [
      "Watermark",
      "IP Address Filtering",
      "Access Policy",
      "ARP Protection",
      "RTSP Authentication",
      "User Authentication",
      "HTTP Authentication"
    ]
  },
  "Audio": {
    "AudioCompression": ["G.711U", "G.711A"],
    "AudioBitrate": "64 Kbps",
    "TwoWayAudio": "N/A",
    "Suppression": "Support",
    "SamplingRate": "8 kHz"
  },
  "Storage": {
    "EdgeStorage": "Micro SD, up to 512 GB"
  },
  "Network": {
    "Protocols": [
      "IPv4", "IGMP", "ICMP", "ARP", "TCP", "UDP", "DHCP",
      "RTP", "RTSP", "RTCP", "RTMP", "DNS", "DDNS", "NTP",
      "UPnP", "HTTP", "HTTPS", "QoS", "SSL/TLS"
    ],
    "CompatibleIntegration": ["ONVIF (Profile S, G, T)", "API", "SDK"],
    "UserHost": "Up to 32 users (Administrator and Common user)",
    "Security": [
      "Password Protection",
      "Strong Password",
      "HTTPS Encryption",
      "Export Operation Logs",
      "Basic and Digest Authentication for RTSP",
      "Digest Authentication for HTTP",
      "WSSE and Digest Authentication for ONVIF"
    ],
    "Client": ["UNV-Link", "UNV-Link Pro", "EZStation"],
    "WebBrowser": {
      "PluginRequired": "IE 10+, Chrome 45+, Firefox 52+, Edge 79+",
      "PluginFree": "Chrome 57+, Firefox 58+, Edge 16+"
    }
  },
  "Interface": {
    "AudioIO": "N/A",
    "AlarmIO": "N/A",
    "SerialPort": "N/A",
    "BuiltInMic": "Support",
    "BuiltInSpeaker": "N/A",
    "WIFI": "N/A",
    "Network": "1 × RJ45 10M/100M Base-TX Ethernet",
    "VideoOutput": "N/A"
  },
  "Certification": {
    "EMC": [
      "CE-EMC (EN 55032, EN 61000-3-3, EN IEC 61000-3-2, EN 55035)",
      "FCC (FCC 47 CFR part15 B)"
    ],
    "Safety": [
      "CE LVD (EN 62368-1)",
      "CB (IEC 62368-1)"
    ],
    "Environment": [
      "CE-RoHS (2011/65/EU;(EU)2015/863)",
      "WEEE (2012/19/EU)"
    ],
    "Protection": ["IP67 (IEC 60529)", "IK10 (IEC 62262)"]
  },
  "General": {
    "Power": "DC 12V ±25%, PoE (IEEE 802.3af)",
    "PowerConsumption": "Max 5.0W",
    "PowerInterface": "Ø5.5 mm coaxial power plug",
    "Dimensions": "Ø109 x 83 mm (Ø4.3\" x 3.3\")",
    "Weight": "0.39 kg (0.86 lb)",
    "Material": "Metal + Plastic",
    "WorkingEnvironment": "-30°C to 60°C (-22°F to 140°F), Humidity ≤ 95% RH (non-condensing)",
    "StorageEnvironment": "-30°C to 60°C (-22°F to 140°F), Humidity ≤ 95% RH (non-condensing)",
    "SurgeProtection": "4 KV",
    "ResetButton": "N/A",
    "WebClientLanguage": "English"
  }
}
