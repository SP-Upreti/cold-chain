class RecaptchaTokenManager {
  private token: string | null = null;
  private executeRecaptcha: ((action?: string) => Promise<string>) | null = null;
  private initPromise: Promise<void> | null = null;
  private resolveInit: (() => void) | null = null;

  constructor() {
    // Create a promise that resolves when executeRecaptcha is set
    this.initPromise = new Promise((resolve) => {
      this.resolveInit = resolve;
    });
  }

  setExecuteRecaptcha(executeRecaptcha: (action?: string) => Promise<string>) {
    this.executeRecaptcha = executeRecaptcha;
    // Resolve the init promise
    if (this.resolveInit) {
      this.resolveInit();
      this.resolveInit = null;
    }
  }

  async waitForInit(timeout: number = 5000): Promise<boolean> {
    if (this.executeRecaptcha) return true;
    
    try {
      await Promise.race([
        this.initPromise,
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), timeout)
        )
      ]);
      return this.executeRecaptcha !== null;
    } catch {
      return false;
    }
  }

  async getToken(action: string = 'submit'): Promise<string | null> {
    // Wait for initialization if not ready
    if (!this.executeRecaptcha) {
      const initialized = await this.waitForInit();
      if (!initialized) {
        console.warn('RecaptchaTokenManager: executeRecaptcha not initialized within timeout');
        return null;
      }
    }

    try {
      const token = await this.executeRecaptcha!(action);
      this.token = token;
      return token;
    } catch (error) {
      console.error('RecaptchaTokenManager: Error getting token', error);
      return null;
    }
  }

  clearToken() {
    this.token = null;
  }

  clearExecuteRecaptcha() {
    this.executeRecaptcha = null;
    // Reset init promise
    this.initPromise = new Promise((resolve) => {
      this.resolveInit = resolve;
    });
  }

  isReady(): boolean {
    return this.executeRecaptcha !== null;
  }
}

export const recaptchaTokenManager = new RecaptchaTokenManager();
