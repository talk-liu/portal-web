import apolloProvider from '@/utils/apollo-provider'
import MEMBER from './member.graphql'
import COMPUTINGPOWER from './computingPower.graphql'
import PLATFORMPROFIT from './platformProfit.graphql'
import INCOME from './income.graphql'
import FAVORITEMARKET from './favoriteMarket.graphql'
import UPDATE_FAVORITEMARKET from './updateFavoriteMarket.graphql'
import DELETE_FAVORITEMARKET from './deleteFavoriteMarket.graphql'
import MARKETS from './markets.graphql'
import TICKERS from './tickers.graphql'
import OTC from './otc/otc.graphql'
import OPTIONOTC from './otc/optionOtc.graphql'
import OTCCREATEPAYMENTORDER from './otc/otcCreatePaymentOrder.graphql'
import OTCPAYMENTORDER from './otc/otcPaymentOrder.graphql'
import OTCPAYMENTORDERLIST from './otc/otcPaymentOrderList.graphql'
import OTCQUOTE from './otc/otcQuote.graphql'
import ICOANDOP from './icoAndOp.graphql'
import KLINE from './kline.graphql'
import HOME from './home/index.graphql'
import ISMINER from './isMiner.graphql'
import VOTECOIN from './vote/voteCoin.graphql'
import VOTEHISTORY from './vote/voteHistory.graphql'
import VOTECOUNT from './vote/voteCount.graphql'
import ATMINING from './at-mining/index.graphql'
import CREATEASKORDER from './createAskOrder.graphql'
import CREATEBIDORDER from './createBidOrder.graphql'
import ORDERS from './orders.graphql'
import TRADES from './trades.graphql'
import ACCOUNTS from './accounts.graphql'
import OPTIONACCOUNTS from './optionAccounts.graphql'
import DEPTH from './depth.graphql'
import CURRENCIES from './currencies.graphql'
import VOUCHERS from './vouchers.graphql'
import CANCELORDER from './cancelOrder.graphql'
import CLEARORDER from './clearOrder.graphql'
import PENDINGKLINE from './pendingKLine.graphql'
import SINGLEKLINE from './singleKLine.graphql'
import CONDITIONCREATE from './conditionCreate.graphql'
import CONDITIONCANCEL from './conditionCancel.graphql'
import CONDITIONCLEAR from './conditionClear.graphql'
import CONDITIONCURRENT from './conditionCurrent.graphql'
import CONDITIONHISTORY from './conditionHistory.graphql'
import WITHDRAWADDRESS from './withdraw/withdrawAddress.graphql'
import ADDWITHDRAWADDRESS from './withdraw/addWithdrawAddress.graphql'
import DELWITHDRAWADDRESS from './withdraw/delWithdrawAddress.graphql'
import WITHDRAWCREATE from './withdraw/withdrawCreate.graphql'
import WITHDRAWME from './withdraw/withdrawMe.graphql'
import TWOFACTOR from './withdraw/twoFactor.graphql'
import WITHDRAWRESEND from './withdraw/withdrawResend.graphql'
import WITHDRAWVERIFY from './withdraw/withdrawVerify.graphql'
import DEPOSITADDRESS from './depositAddress.graphql'
import HISTORYTRADES from './historyTrades.graphql'
import NEWBANNER from './newBanner.graphql'
import OPTIONCURRENCIES from './optionCurrencies.graphql'
import FUNDSINTERLOCUTION from './fundsInterlocution.graphql'
import DEPOSITREMARKSNEW from './depositRemarksNew.graphql'
import WITHDRAWSHISTORY from './funds-history/withdrawsHistory.graphql'
import DEPOSITHISTORY from './funds-history/depositHistory.graphql'
import APPLICANTS from './funds-history/applicants.graphql'
import SDKTOKENKYC from './funds-history/sdkTokenKyc.graphql'
import CHECKKYC from './funds-history/checkKyc.graphql'
import COUNTRIES from './fdt/countries.graphql'
import BANK from './fdt/bank.graphql'
import BANKS from './fdt/banks.graphql'
import BANKCARDS from './fdt/bankCards.graphql'
import BANKGET from './fdt/bankGet.graphql'
import DEPOSITLIST from './fdt/depositList.graphql'
import WITHDRAWLIST from './fdt/withdrawList.graphql'
import BANKWIRES from './fdt/bankWires.graphql'
import BANKWIRESGET from './fdt/bankWiresGet.graphql'
import BANKWIRESLIST from './fdt/bankWiresList.graphql'
import FIAT from './fdt/fiat.graphql'
import ACCOUNTTRANSFERHISTORY from './funds-history/accountTransferHistory.graphql'
import TRANSFERSHISTORY from './funds-history/transfersHistory.graphql'
import HISTORYPROFITS from './historyProfits.graphql'
import HISTORYMINING from './historyMining.graphql'
import DOCUMENTSMS from './documentSms.graphql'
import VERIFY from './settings/verify.graphql'
import APPFACTOR from './settings/appFactor.graphql'
import CONFIRMFACTOR from './settings/confirmFactor.graphql'
import RESETPASSWORD from './settings/resetPassword.graphql'
import APPFACTOROTP from './settings/appFactorOtp.graphql'
import PROXYAUTH from './settings/proxyAuth.graphql'
import CAPTCHA from './login-register/captcha.graphql'
import CHALLENGE from './login-register/challenge.graphql'
import FORGETPASSWORD from './login-register/forgetPassword.graphql'
import FORGETPASSWORDCODE from './login-register/forgetPasswordCode.graphql'
import FORGETPSW from './login-register/forgetPsw.graphql'
import RESETFORGETPASSWORD from './login-register/resetForgetPassword.graphql'
import APITOKENS from './apiManagement/apiTokens.graphql'
import DELETEAPI from './apiManagement/deleteApi.graphql'
import CREATEAPI from './apiManagement/createApi.graphql'
import UPDATEAPI from './apiManagement/updateApi.graphql'
import REDIRECT from './settings/redirect.graphql'
import ACTIVATE from './login-register/activate.graphql'
import ACTIVATIONEMAIL from './login-register/activationEmail.graphql'
import AUTHTWOFACTOR from './login-register/authTwoFactor.graphql'
import SIGNIN from './login-register/signin.graphql'
import SIGNOUT from './login-register/signout.graphql'
import SIGNUP from './login-register/signup.graphql'
import TWOFRONTENDFACTOR from './login-register/twoFrontendFactor.graphql'
import REGISTERACTIVE from './login-register/registerActive.graphql'
import ATVIPGRADE from './atVipGrade.graphql'
import VIPLEVEL from './vipLevel.graphql'
import ATGAMEREWARDHISTORY from './atGameRewardHistory.graphql'
import ATGAME from './atGame.graphql'
import IEOPURCHASE from './ieo/ieoPurchase.graphql'
import IEOINFO from './ieo/ieoInfo.graphql'
import IEOHISTORY from './ieo/ieoHistory.graphql'
const queryList = {
  MEMBER,
  COMPUTINGPOWER,
  PLATFORMPROFIT,
  INCOME,
  FAVORITEMARKET,
  MARKETS,
  TICKERS,
  OTC,
  OTCPAYMENTORDER,
  OTCPAYMENTORDERLIST,
  OTCQUOTE,
  ICOANDOP,
  KLINE,
  HOME,
  ISMINER,
  ATMINING,
  VOTECOIN,
  VOTEHISTORY,
  VOTECOUNT,
  ORDERS,
  TRADES,
  ACCOUNTS,
  OPTIONACCOUNTS,
  DEPTH,
  CURRENCIES,
  VOUCHERS,
  PENDINGKLINE,
  SINGLEKLINE,
  OPTIONOTC,
  CONDITIONCURRENT,
  CONDITIONHISTORY,
  WITHDRAWADDRESS,
  WITHDRAWME,
  HISTORYTRADES,
  NEWBANNER,
  DEPOSITADDRESS,
  OPTIONCURRENCIES,
  FUNDSINTERLOCUTION,
  WITHDRAWSHISTORY,
  DEPOSITHISTORY,
  APPLICANTS,
  SDKTOKENKYC,
  CHECKKYC,
  COUNTRIES,
  BANK,
  BANKS,
  BANKCARDS,
  BANKGET,
  DEPOSITLIST,
  WITHDRAWLIST,
  BANKWIRES,
  BANKWIRESGET,
  BANKWIRESLIST,
  FIAT,
  ACCOUNTTRANSFERHISTORY,
  TRANSFERSHISTORY,
  DEPOSITREMARKSNEW,
  HISTORYPROFITS,
  HISTORYMINING,
  CAPTCHA,
  CHALLENGE,
  APITOKENS,
  REGISTERACTIVE,
  ATVIPGRADE,
  VIPLEVEL,
  ATGAME,
  ATGAMEREWARDHISTORY,
  IEOPURCHASE,
  IEOINFO,
  IEOHISTORY,
}

const mutationList = {
  UPDATE_FAVORITEMARKET,
  DELETE_FAVORITEMARKET,
  CREATEASKORDER,
  CREATEBIDORDER,
  CANCELORDER,
  CLEARORDER,
  CONDITIONCREATE,
  CONDITIONCANCEL,
  CONDITIONCLEAR,
  ADDWITHDRAWADDRESS,
  DELWITHDRAWADDRESS,
  WITHDRAWCREATE,
  TWOFACTOR,
  WITHDRAWRESEND,
  WITHDRAWVERIFY,
  OTCCREATEPAYMENTORDER,
  DOCUMENTSMS,
  VERIFY,
  APPFACTOR,
  CONFIRMFACTOR,
  RESETPASSWORD,
  APPFACTOROTP,
  PROXYAUTH,
  FORGETPASSWORD,
  FORGETPASSWORDCODE,
  FORGETPSW,
  RESETFORGETPASSWORD,
  DELETEAPI,
  CREATEAPI,
  UPDATEAPI,
  REDIRECT,
  ACTIVATE,
  ACTIVATIONEMAIL,
  AUTHTWOFACTOR,
  SIGNIN,
  SIGNOUT,
  SIGNUP,
  TWOFRONTENDFACTOR,
}
import { Message } from 'element-ui'
const query = async(api, params = {}, fetchPolicy) => {
  try {
    let response
    if (fetchPolicy) {
      response = await apolloProvider.defaultClient.query({
        query: queryList[api],
        variables: params,
        fetchPolicy,
      })
    } else {
      response = await apolloProvider.defaultClient.query({ query: queryList[api], variables: params })
    }
    if(response.errors){
      Message({
        message:response.errors[0].message,
        type: 'error'
      });
    }
    return response
  } catch (error) {
    console.error(error)
  }
}

const queryWithNoCatch = async(api, params = {}, fetchPolicy) => {
  let response
  if (fetchPolicy) {
    response = await apolloProvider.defaultClient.query({
      query: queryList[api],
      variables: params,
      fetchPolicy,
    })
  } else {
    response = await apolloProvider.defaultClient.query({ query: queryList[api], variables: params })
  }
  // if(response.errors){
  //   Message({
  //     message:response.errors[0].message,
  //     type: 'error'
  //   });
  // }
  return response
}

const mutate = async(api, params = {}) => {
  try {
    let response = await apolloProvider.defaultClient.mutate({ mutation: mutationList[api], variables: params })
    // if(response.errors){
    //   Message({
    //     message:response.errors[0].message,
    //     type: 'error'
    //   });
    // }
    return response
  } catch (error) {
    console.error(error)
  }
}

export default {
  query,
  mutate,
  queryWithNoCatch,
}
