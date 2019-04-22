import { IsEnum } from '@/commons/enums/IsEnum';

export default class AssertUtil {

  public static isTrue(value: number) {
    return value && value === IsEnum.TURE;
  }
}
