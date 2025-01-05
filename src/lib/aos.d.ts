declare module "aos" {
    const AOS: {
      init: (options?: {
        duration?: number;
        offset?: number;
        delay?: number;
        easing?: string;
        once?: boolean;
        mirror?: boolean;
      }) => void;
    };
    export default AOS;
  }
  