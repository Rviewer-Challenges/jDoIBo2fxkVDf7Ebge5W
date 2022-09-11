export class RegexExpressions {
  public static readonly EMAIL = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
  public static readonly PASSWORD = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.\-_*])([a-zA-Z0-9@#$%^&+=*.\-_]){5,40}$/;
  public static readonly TEXT = /^([a-zA-Z\ñÀ-ú]+(\s?[a-zA-Z\ñÀ-ú])){2,20}$/;
}