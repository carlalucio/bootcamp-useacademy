export abstract class RequestDto {
    static validators(): unknown {
      throw new Error('Validators not implemented!');
    }
  }