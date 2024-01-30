import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.habittracker.app",
  appName: "habit-tracker",
  webDir: "build",
  server: {
    androidScheme: "https",
  },
};

export default config;
