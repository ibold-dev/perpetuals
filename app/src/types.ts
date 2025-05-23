import { MethodsNamespace, IdlTypes, IdlAccounts } from "@coral-xyz/anchor";
import { Perpetuals } from "../../target/types/perpetuals";

export type PositionSide = "long" | "short";

export type Methods = MethodsNamespace<Perpetuals>;
export type Accounts = IdlAccounts<Perpetuals>;
export type Types = IdlTypes<Perpetuals>;

export type InitParams = Types["initParams"];

export type OracleParams = Types["oracleParams"];
export type PricingParams = Types["pricingParams"];
export type Permissions = Types["permissions"];
export type Fees = Types["fees"];
export type BorrowRateParams = Types["borrowRateParams"];
export type TokenRatio = Types["tokenRatios"];
export type SetCustomOraclePriceParams = Types["setCustomOraclePriceParams"];
export type AmountAndFee = Types["amountAndFee"];
export type NewPositionPricesAndFee = Types["newPositionPricesAndFee"];
export type PriceAndFee = Types["priceAndFee"];
export type ProfitAndLoss = Types["profitAndLoss"];
export type SwapAmountAndFees = Types["swapAmountAndFees"];

export type Custody = Accounts["custody"];
export type Pool = Accounts["pool"];
export type Position = Accounts["position"];
export type PerpetualsAccount = Accounts["perpetuals"];
