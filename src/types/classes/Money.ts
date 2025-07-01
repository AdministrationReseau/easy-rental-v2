export interface Money {
  amount: number;
  currency: string;
}

export interface MoneyServices {
  add(money: Money): Money;
  subtract(money: Money): Money;
  multiply(factor: number): Money;
  isZero(): boolean;
}
