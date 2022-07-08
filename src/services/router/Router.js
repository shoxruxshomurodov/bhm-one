import React, { Component } from "react";
import {
  BrowserRouter as WebRouter,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import history from "./history";
import LayoutManager from "../../views/layouts/LayoutManager";
import config from "../../config";

// <--- RBAC -->>>
import AuthLoader from "../auth/rbac/AuthLoader";
import IsAuth from "../auth/rbac/IsAuth";
import IsGuest from "../auth/rbac/IsGuest";
import HasProfile from "../auth/rbac/HasProfile";
import HasNotProfile from "../auth/rbac/HasNotProfile";
import WithUser from "../auth/rbac/WithUser";
import AccessDenied from "../../components/AccessDenied/AccessDenied";
// <--- RBAC -->>>
// <---- Auth ---->
import LoginOrSignUpPage from "../auth/views/LoginOrSignUpPage/LoginOrSignUpPage";
import ApprovePage from "../auth/views/ApprovePage/ApprovePage";
import LogoutPage from "../auth/views/LogoutPage/LogoutPage";
import LoginPage from "../auth/views/LoginPage/LoginPage";
import LinkEmployeePage from "../auth/views/LinkEmployeePage/LinkEmployeePage";
// <---- Auth ---->
// <---- Home ---->
import ProfilePage from "../../views/pages/ProfilePage";
import UpdatePasswordPage from "../auth/views/UpdatePassword/UpdatePasswordPage";
// <---- Home ---->
// <----Chat ---->
import ChatPage from "../../modules/chat/views/pages/ChatPage";
import ChatCreateGroupPage from "../../modules/chat/views/pages/ChatCreateGroupPage";
import ChatAddMemberPage from "../../modules/chat/views/pages/ChatAddMemberPage";
import ChatDeleteMemberPage from "../../modules/chat/views/pages/ChatDeleteMemberPage";
import ChatChangeNamePage from "../../modules/chat/views/pages/ChatChangeNamePage";
import ChatContactsPage from "../../modules/chat/views/pages/ChatContactsPage";
import ChatInterlocutorPage from "../../modules/chat/views/pages/ChatInterlocutorPage";
// <----Chat ---->
// <----Face-control ---->
import TabsLayout from "../../modules/face-control/views/layout/Tabs/TabsLayout";
import PersonalMonthlyPage from "../../modules/face-control/views/pages/PersonalMonthlyPage";
import EmployeesDepartmentPage from "../../modules/face-control/views/pages/EmployeesDepartmentPage";
import DepartmentListPage from "../../modules/face-control/views/pages/DepartmentListPage";
import TotalWorkHourDepartmentEmployeesPage from "../../modules/face-control/views/pages/TotalWorkHourDepartmentEmployeesPage";
import VisibilityPage from "../../modules/face-control/views/pages/VisibilityPage";
import VisibilityDepartmentPage from "../../modules/face-control/views/pages/VisibilityDepartmentPage";
import LateDaysReasonPage from "../../modules/face-control/views/pages/LateDaysReasonPage";
// <----Face-control ---->
// <----Problem-credits ---->
import ProblemCreditsLayout from "../../modules/problem-credits/views/layout/ProblemCreditsLayout";
import ProblemCreditsPage from "../../modules/problem-credits/views/pages/FiveTypesPage";
import OneToThirtyCreditsPage from "../../modules/problem-credits/views/pages/FiveTypesPage/1-30";
import ThirtyToSixtyCreditsPage from "../../modules/problem-credits/views/pages/FiveTypesPage/30-60";
import SixtyToNinetyCreditsPage from "../../modules/problem-credits/views/pages/FiveTypesPage/60-90";
import NinetyToAllCreditsPage from "../../modules/problem-credits/views/pages/FiveTypesPage/90-180";
import HundredEightyToAllCreditsPage from "../../modules/problem-credits/views/pages/FiveTypesPage/180-all";
import ProbremLoanPage from "../../modules/problem-credits/views/pages/ProbremLoanPage/ProbremLoanPage";
import ExpiredCreditsPage from "../../modules/problem-credits/views/pages/ExpiredCreditsPage";
import ExpiredCreditsUserPage from "../../modules/problem-credits/views/pages/ExpiredCreditsPage/ViewPage";
import DashboardPage from "../../modules/problem-credits/views/pages/DashboardPage";
import CalendarPage from "../../modules/problem-credits/views/pages/CalendarPage";
// <----Problem-credits ---->
// <-- LinkedEmployeesPage -->
import LinkedEmployeesPage from "../../modules/problem-credits/views/pages/LinkedEmployeesPage/LinkedEmployeesPage";
// <-- LinkedEmployeesPage -->
// <-- EMPLOYEES ATTACHMENT -->
import LinkedLoansPage from "../../modules/problem-credits/views/pages/LinkedLoansPage";
import ViewPage from "../../modules/problem-credits/views/pages/LinkedLoansPage/ViewPage";
import MyCreditsPage from "../../modules/problem-credits/views/pages/MyCreditPage";
import MyCreditsUserPage from "../../modules/problem-credits/views/pages/MyCreditPage/ViewPage";
// <-- EMPLOYEES ATTACHMENT -->
// <--- KpiPage -->
import KpiPage from "../../modules/problem-credits/views/pages/KpiPage";
import KpiUser from "../../modules/problem-credits/views/pages/KpiPage/KpiUser";
// <--- KpiPage -->
// <--- EMPLOYEES LIST --->
import EmployeesCreditsPage from "../../modules/problem-credits/views/pages/EmployeesPage/EmployeesCreditsPage";
import EmployeeCreditViewPage from "../../modules/problem-credits/views/pages/EmployeesPage/View";
// <--- EMPLOYEES LIST --->
// <--- ACCESS PAGE -->
import AccessPage from "../../modules/problem-credits/views/pages/AccessPage";
// <--- ACCESS PAGE -->
// <--- IntentionalPage --->
import IntentionalPage from "../../modules/problem-credits/views/pages/IntentionalPage";
import IntentionalViewPage from "../../modules/problem-credits/views/pages/IntentionalPage/ViewPage";
// <--- IntentionalPage --->
// <--- FORMED-LIST -->
import FormedListPage from "../../modules/problem-credits/views/pages/FormedListPage";
import FormedListViewPage from "../../modules/problem-credits/views/pages/FormedListPage/ViewPage";
// <--- FORMED-LIST -->
// <--- RESPUBLIC Judge -->
import RespublicJudgeToTal from "../../modules/problem-credits/views/pages/RespublicPage/Judges/JudgeToTal";
import RespublicJudgesPage from "../../modules/problem-credits/views/pages/RespublicPage/Judges";
import RespublicJudgesView from "../../modules/problem-credits/views/pages/RespublicPage/Judges/ViewPage";
// <--- RESPUBLIC Judge -->
// <--- RESPUBLIC Monitoring -->
import RespublicMonitoringTotal from "../../modules/problem-credits/views/pages/RespublicPage/Monitoring/MonitoringTotal";
import RespublicMonitoringPage from "../../modules/problem-credits/views/pages/RespublicPage/Monitoring";
import RespublicMonitoringViewPage from "../../modules/problem-credits/views/pages/RespublicPage/Monitoring/Viewpage";
// <--- RESPUBLIC Monitoring -->
// <--- JUDGE PROCESS -->
import JuridicProcessPage from "../../modules/problem-credits/views/pages/JudgeProcessPage";
import JuridicProcessView from "../../modules/problem-credits/views/pages/JudgeProcessPage/ViewPage";
// <--- JUDGE PROCESS -->
// <--- SIXTY-NINTY-PAGE --->>>
import SixtyNintyPage from "../../modules/problem-credits/views/pages/SixtyNintyPage";
import SixtyNintyView from "../../modules/problem-credits/views/pages/SixtyNintyPage/ViewPage";
// <--- SIXTY-NINTY-PAGE --->>>
// <--- SIXTY-NINTY-PAGE --->>>
import MonitoringPage from "../../modules/problem-credits/views/pages/MonitoringPage";
import MonitoringViewPage from "../../modules/problem-credits/views/pages/MonitoringPage/ViewPage";
import VacanciesPage from "../../modules/vacancy/views/pages/VacanciesPage";
import CandidateApplicationPage from "../../modules/vacancy/views/pages/CandidateApplicationPage";
import CandidateApplicationsPage from "../../modules/vacancy/views/pages/CandidateApplicationsPage";
import ApplyCandidateApplicationPage from "../../modules/vacancy/views/pages/ApplyCandidateApplicationPage";
import ApplyCandidateFilesPage from "../../modules/vacancy/views/pages/ApplyCandidateFilesPage";
import VacancyDashboardPage from "../../modules/vacancy/views/pages/VacancyDashboardPage";
import VacancySettingsCreateRolePage from "../../modules/vacancy/views/pages/VacancySettingsCreateRolePage";
import VacancySettingsGiveRolePage from "../../modules/vacancy/views/pages/VacancySettingsGiveRolePage";
import VacancySettingsRevertRolePage from "../../modules/vacancy/views/pages/VacancySettingsRevertRolePage";
import VacancyCandidateQuestionsPage from "../../modules/vacancy/views/pages/VacancyCandidateQuestionsPage";
// <--- SIXTY-NINTY-PAGE --->>>
// <<--- VIDEO UPLOAD --->>>
import UpdateLayout from "../../modules/upload-video/views/UpdateLayout";
import DailyHistoryPage from "../../modules/upload-video/views/DailyHistoryPage";
import UploadVideoPage from "../../modules/upload-video/views/UploadVideoPage";
import MessageContainer from "../../modules/language/containers/MessageContainer";
// <<--- VIDEO UPLOAD --->>>

// CURRENCY
import TabsLayoutCurrency from "../../modules/currency-rates/views/layout/Tabs/TabsLayoutCurrency";
import CurrencyRatesListTodayPage from "../../modules/currency-rates/views/pages/CurrencyRatesListTodayPage";
import CurrencyRatesViewPage from "../../modules/currency-rates/views/pages/CurrencyRatesViewPage";
import CurrencyRatesUpdatePage from "../../modules/currency-rates/views/pages/CurrencyRatesUpdatePage";
import CurrencyRatesListPage from "../../modules/currency-rates/views/pages/CurrencyRatesListPage";
import CurrencyRatesCreatePage from "../../modules/currency-rates/views/pages/CurrencyRatesCreatePage";
import DepositEmployeeViewListPage from "../../modules/deposit-bonus/views/pages/DepositEmployeeViewListPage";
// CURRENCY

// CURRENCY-JURIDIC
import TabsLayoutCurrencyJuridic from "../../modules/currency-rates-juridic/views/layout/Tabs/TabsLayoutCurrency";
import CurrencyJuridicRatesListTodayPage from "../../modules/currency-rates-juridic/views/pages/CurrencyRatesListTodayPage";
import CurrencyJuridicRatesViewPage from "../../modules/currency-rates-juridic/views/pages/CurrencyRatesViewPage";
import CurrencyJuridicRatesUpdatePage from "../../modules/currency-rates-juridic/views/pages/CurrencyRatesUpdatePage";
import CurrencyJuridicRatesListPage from "../../modules/currency-rates-juridic/views/pages/CurrencyRatesListPage";
import CurrencyJuridicRatesCreatePage from "../../modules/currency-rates-juridic/views/pages/CurrencyRatesCreatePage";
//  CURRENCY-JURIDIC

// <<--- LANGUAGE --->>>
import CreateMessage from "../../modules/language/containers/CreateMessage";

import UpdateMessage from "../../modules/language/containers/UpdateMessage";
// <<--- LANGUAGE --->>>
// <<--- SEND SMS --->>>
import SendSmsPage from "../../modules/send-sms/views/pages/SendSmsPage";
import CreditMonitoringControlsLoansPage from "../../modules/monitoring/views/controlsLoans/ControlLoansPage";
import SendSmsMonitoringPage from "../../modules/send-sms/views/pages/SendSmsMonitoringPage";
import TabsLayoutSms from "../../modules/send-sms/layout/Tabs/TabsLayout";
import SendSmsCreateCategoryPage from "../../modules/send-sms/views/pages/SendSmsCreateCategoryPage";
import SendSmsProcessPage from "../../modules/send-sms/views/pages/SendSmsProcessPage";
// <<--- SEND SMS --->>>

// <<--- KATM --->>>
import ActiveRequests from "../../modules/katm/views/ActiveRequests";
import Monitoring from "../../modules/katm/views/Monitoring";
import MonitoringViewContainer from "../../modules/katm/containers/MonitoringViewContainer";

// <<--- KATM --->>>
// CREDIT MONITORING BRANCH
import BranchLoansPage from "../../modules/monitoring/views/monitoring/BranchLoan/BranchLoansPage";
import BranchPurposePage from "../../modules/monitoring/views/monitoring/BranchLoan/BranchPurposePage";
import BranchContinuousPage from "../../modules/monitoring/views/monitoring/BranchLoan/BranchContinuousPage";
import BranchPurposeView from "../../modules/monitoring/container/branchLoan/BranchPurposeView";
import BranchContinuousView from "../../modules/monitoring/container/branchLoan/BranchContinuousView";
// CREDIT MONITORING BRANCH

// CREDIT MONITORING MYLOAN
import MyLoanViewPage from "../../modules/monitoring/views/monitoring/MyLoan/MyLoanViewPage";
// CREDIT MONITORING MYLOAN

// CREDIT MONITORING REGION
import RegionLoansPage from "../../modules/monitoring/views/monitoring/RegionLoan/RegionLoansPage";
import RegionContinuousPage from "../../modules/monitoring/views/monitoring/RegionLoan/RegionContinuousPage";
import RegionPurposePage from "../../modules/monitoring/views/monitoring/RegionLoan/RegionPurposePage";
import RegionPurposeView from "../../modules/monitoring/container/regionLoan/RegionPurposeView";
import RegionContinuousView from "../../modules/monitoring/container/regionLoan/RegionContinuousView";
// CREDIT MONITORING REGION

// CREDIT MONITORING DOCUMENTS
import CreditMonitoringDocumentsPage from "../../modules/monitoring/views/documents/DocumentsPage";
import CreditMonitoringUpdatePage from "../../modules/monitoring/views/documents/DocumentUpdatePage";
import CreditDocumentCreatePage from "../../modules/monitoring/views/documents/DocumentCreatePage";
// CREDIT MONITORING DOCUMENTS
// CREDIT MONITORING REQUIREMENTS
import CreditMonitoringRequirementsPage from "../../modules/monitoring/views/requirements/RequirementsPage";
import CreditMonitoringRequirementsViewPage from "../../modules/monitoring/views/requirements/RequirementsViewPage";
import CreditMonitoringBooksPage from "../../modules/monitoring/views/book/BookPage";
import CreditMonitoringBookViewPage from "../../modules/monitoring/views/book/BookViewPage";
// CREDIT MONITORING REQUIREMENTS

// CREDIT MONITORING REPUBLIC BRANCHES
import CreditMonitoringRepublicPage from "../../modules/monitoring/views/republic/RepublicPage";
import CreditMonitoringEmployeesPage from "../../modules/monitoring/views/employees/Employees/EmployeesPage";
import CreditMonitoringEmployeeView from "../../modules/monitoring/views/employees/container/EmployeeView";
import CreditMonitoringRepublicViewPage from "../../modules/monitoring/views/republic/RepublicViewPage";
// CREDIT MONITORING REPUBLIC BRANCHES

// CREDIT MONITORING LOAN DETAILS
import CreditMonitoringLoanDetailsPage from "../../modules/monitoring/views/loanDetail/LoanDetailPage";
// CREDIT MONITORING LOAN DETAILS
// CREDIT MONITORING EXPIRED LOAN
import CreditMonitoringExpiredLoansPage from "../../modules/monitoring/views/expiredLoans/ExpiredLoansPage";
import AppealPage from "../../modules/appeal/views/AppealPage";
import AppealCreate from "../../modules/appeal/views/AppealCreate";
// CREDIT MONITORING EXPIRED LOAN

// CREDIT MONITORING STAGES
import CreditMonitoringStagesPage from "../../modules/monitoring/views/stages/StagesPage";
import CreditMonitoringStagesViewPage from "../../modules/monitoring/views/stages/StagesViewPage";
import CreditMonitoringStagesCreatePage from "../../modules/monitoring/views/stages/StagesCreatePage";
import CreditMonitoringStagesUpdatePage from "../../modules/monitoring/views/stages/StagesUpdatePage";
// CREDIT MONITORING STAGES

// CREDIT MONITORING MYLOAN
import ExpiredLoanViewPage from "../../modules/monitoring/views/expiredLoans/MyLoan/MyLoanViewPage";
// CREDIT MONITORING MYLOAN

// CREDIT MONITORING ACCESS
import CreditMonitoringAccessPage from "../../modules/monitoring/views/access/AccessPage";
// CREDIT MONITORING ACCESS

// CREDIT MONITORING CONTROL LOANS

// CREDIT MONITORING CONTROL LOANS

// CREDIT MONITORING NPL REGIONS
import CreditMonitoringNplReportPage from "../../modules/monitoring/views/nplReport/NplReportPage";
import CreditMonitoringNplAboutPage from "../../modules/monitoring/views/nplReport/NplAboutPage";
import CreditMonitoringNplProgressPage from "../../modules/monitoring/views/progress/NplProgressPage";
// WORKFLOW MONITORING NPL REGIONS
// CREDIT MONITORING NPL REGIONS

// RBAC ACCESS
import RbacAuthRulePage from "../../modules/rbac/auth-rule/ListPage";
import RbacAuthItemPage from "../../modules/rbac/auth-item/ListPage";
import RbacAuthItemChildPage from "../../modules/rbac/auth-item-child/ListPage";
import RbacAuthAssignmentPage from "../../modules/rbac/auth-assignment/ListPage";

// RBAC ACCESS

//WORKFLOW
import WorkflowTransitionPage from "../../modules/workflow/views/pages/WorkflowTransitionPage";
import WorkflowStatePage from "../../modules/workflow/views/pages/WorkflowStatePage";
import WorkflowTypePage from "../../modules/workflow/views/pages/WorkflowTypePage";
import WorkflowHasTransitionPage from "../../modules/workflow/views/pages/WorkflowHasTransitionPage";
import WorkflowFromStatePage from "../../modules/workflow/views/pages/WorkflowFromStatePage";
import WorkflowToStatePage from "../../modules/workflow/views/pages/WorkflowToStatePage";
import WorkflowProcessPage from "../../modules/workflow/views/pages/WorkflowProcessPage";
import WorkflowTermPage from "../../modules/workflow/views/pages/WorkflowTermPage";
import WorkflowProcessFilesPage from "../../modules/workflow/views/pages/WorkflowProcessFilesPage";
import WorkflowFileStatePage from "../../modules/workflow/views/pages/WorkflowFileStatePage";
// WORKFLOW

// TASK
import MyTaskPage from "../../modules/tasks/myTask/ListPage";
import MyTaskViewPage from "../../modules/tasks/myTask/View";
import AllTaskPage from "../../modules/tasks/allTask/ListPage";
import MonitoringAllCredits from "../../modules/tasks/monitoringCredit/ListPage";
import MonitoringReport from "../../modules/tasks/report/ListPage";
import WorkflowProccessViewPage from "../../modules/workflow/views/pages/WorkflowProccessViewPage";
import WorkflowTabPage from "../../modules/workflow/views/pages/WorkflowTabPage";
// TASK

// BONUS
import CreditMonitoringBonusEmployeesPage from "../../modules/monitoring/views/bonus/employees/EmployeesPage";
import CreditMonitoringBonusEmployeesSheetPage from "../../modules/monitoring/views/bonus/employees-bonus/EmployeesBonusSheetPage";
import CreditMonitoringBonusEmployeesPageView from "../../modules/monitoring/views/bonus/employees-bonus/EmployeesBonusPageView";
import CreditMonitoringBonusPage from "../../modules/monitoring/views/bonus/my-bonus/MyBonusPage";
import CreditMonitoringBonusEmployeeCreatePage from "../../modules/monitoring/views/bonus/employees/EmployeeCreatePage";
import AttachmentPage from "../../modules/monitoring/views/bonus/attachment/AttachmentPage";
import MyAttachmentPage from "../../modules/monitoring/views/bonus/attachment/MyAttachmentPage";
import CreditMonitoringLoansPage from "../../modules/monitoring/views/bonus/loans/LoansPage";
import CreditMonitoringLoanViewPage from "../../modules/monitoring/views/bonus/loans/LoanViewPage";
// BONUS
class Router extends Component {
  render() {
    return (
      <WebRouter history={history}>
        <AuthLoader>
          <LayoutManager>
            <IsAuth>
              <HasProfile>
                <WithUser>
                  {({ userCan }) => {
                    return (
                      <Switch>
                        <Route exact path="/home" component={ProfilePage} />
                        <Route exact path="/profile" component={ProfilePage} />
                        <Route
                          exact
                          path="/profile-edit"
                          component={UpdatePasswordPage}
                        />
                        <Route
                          exact
                          path="/chat/create/group"
                          component={ChatCreateGroupPage}
                        />
                        <Route
                          exact
                          path="/chat/group/:chat_id"
                          component={ChatPage}
                        />
                        <Route
                          exact
                          path="/chat/add/member/:chat_id"
                          component={ChatAddMemberPage}
                        />
                        <Route
                          exact
                          path="/chat/delete/member/:chat_id"
                          component={ChatDeleteMemberPage}
                        />
                        <Route
                          exact
                          path="/chat/group/:chat_id/update"
                          component={ChatChangeNamePage}
                        />
                        <Route
                          exact
                          path="/chat"
                          render={() => {
                            return userCan([
                              config.ROLES.RESPUBLIC,
                              config.ROLES.FACE_CONTROL_ADMIN
                            ]) ? (
                              <ChatContactsPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/chat/interlocutor/:user_id"
                          component={ChatInterlocutorPage}
                        />
                        <Route
                          exact
                          path="/face-control/personal-monthly"
                          render={() => {
                            return userCan([
                              config.ROLES.RESPUBLIC,
                              config.ROLES.FACE_CONTROL_ADMIN,
                              config.ROLES.USER
                            ]) ? (
                              <TabsLayout>
                                <PersonalMonthlyPage />
                              </TabsLayout>
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/face-control/employees-department"
                          render={() => {
                            return userCan([
                              config.ROLES.DEPARTMENT_MANAGER,
                              config.ROLES.FACE_CONTROL_ADMIN
                            ]) ? (
                              <TabsLayout>
                                <EmployeesDepartmentPage />
                              </TabsLayout>
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/face-control/department-list"
                          render={() => {
                            return userCan(config.ROLES.FACE_CONTROL_ADMIN) ? (
                              <TabsLayout>
                                <DepartmentListPage />
                              </TabsLayout>
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/face-control/total-department"
                          render={() => {
                            return userCan(config.ROLES.FACE_CONTROL_ADMIN) ? (
                              <TabsLayout>
                                <TotalWorkHourDepartmentEmployeesPage />
                              </TabsLayout>
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/face-control/visibility"
                          render={() => {
                            return userCan([
                              config.ROLES.DEPARTMENT_MANAGER,
                              config.ROLES.FACE_CONTROL_ADMIN
                            ]) ? (
                              <TabsLayout>
                                <VisibilityPage />
                              </TabsLayout>
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/face-control/visibility-department"
                          render={() => {
                            return userCan(config.ROLES.FACE_CONTROL_ADMIN) ? (
                              <TabsLayout>
                                <VisibilityDepartmentPage />
                              </TabsLayout>
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/face-control/lateDays_reason"
                          render={() => {
                            return userCan(config.ROLES.FACE_CONTROL_ADMIN) ? (
                              <TabsLayout>
                                <LateDaysReasonPage />
                              </TabsLayout>
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/workflow/type"
                          render={() => {
                            return userCan(config.ROLES.FACE_CONTROL_ADMIN) ? (
                              <WorkflowTypePage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/workflow/state"
                          render={() => {
                            return userCan(config.ROLES.FACE_CONTROL_ADMIN) ? (
                              <WorkflowStatePage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/workflow/transition"
                          render={() => {
                            return userCan(config.ROLES.FACE_CONTROL_ADMIN) ? (
                              <WorkflowTransitionPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/workflow/has-transition"
                          render={() => {
                            return userCan(config.ROLES.FACE_CONTROL_ADMIN) ? (
                              <WorkflowHasTransitionPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/workflow/transition-from-state"
                          render={() => {
                            return userCan(config.ROLES.FACE_CONTROL_ADMIN) ? (
                              <WorkflowFromStatePage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/workflow/transition-to-state"
                          render={() => {
                            return userCan(config.ROLES.FACE_CONTROL_ADMIN) ? (
                              <WorkflowToStatePage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/workflow/processes"
                          render={() => {
                            return userCan(config.ROLES.FACE_CONTROL_ADMIN) ? (
                              <WorkflowProcessPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/workflow/processes/view/:id"
                          render={() => {
                            return userCan(config.ROLES.FACE_CONTROL_ADMIN) ? (
                              <WorkflowProccessViewPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/workflow/term"
                          render={() => {
                            return userCan(config.ROLES.FACE_CONTROL_ADMIN) ? (
                              <WorkflowTermPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/workflow/process-files"
                          render={() => {
                            return userCan(config.ROLES.FACE_CONTROL_ADMIN) ? (
                              <WorkflowProcessFilesPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/workflow/process-files-state"
                          render={() => {
                            return userCan(config.ROLES.FACE_CONTROL_ADMIN) ? (
                              <WorkflowFileStatePage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/workflow/tabs"
                          render={() => {
                            return userCan(config.ROLES.FACE_CONTROL_ADMIN) ? (
                              <WorkflowTabPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/problem-credits/all"
                          render={() => {
                            return userCan(config.ROLES.COLLECTOR_ADMIN) ? (
                              <ProblemCreditsLayout>
                                <ProblemCreditsPage />
                              </ProblemCreditsLayout>
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/problem-credits/one-to-thirty"
                          render={() => {
                            return userCan(config.ROLES.COLLECTOR_ADMIN) ? (
                              <ProblemCreditsLayout>
                                <OneToThirtyCreditsPage />
                              </ProblemCreditsLayout>
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/problem-credits/thirty-to-sixty"
                          render={() => {
                            return userCan(config.ROLES.COLLECTOR_ADMIN) ? (
                              <ProblemCreditsLayout>
                                <ThirtyToSixtyCreditsPage />
                              </ProblemCreditsLayout>
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/problem-credits/sixty-to-ninety"
                          render={() => {
                            return userCan(config.ROLES.COLLECTOR_ADMIN) ? (
                              <ProblemCreditsLayout>
                                <SixtyToNinetyCreditsPage />
                              </ProblemCreditsLayout>
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/problem-credits/ninety-to-all"
                          render={() => {
                            return userCan(config.ROLES.COLLECTOR_ADMIN) ? (
                              <ProblemCreditsLayout>
                                <NinetyToAllCreditsPage />
                              </ProblemCreditsLayout>
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/problem-credits/hundred-to-all"
                          render={() => {
                            return userCan(config.ROLES.COLLECTOR_ADMIN) ? (
                              <ProblemCreditsLayout>
                                <HundredEightyToAllCreditsPage />
                              </ProblemCreditsLayout>
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/calendar"
                          render={() => {
                            return userCan(config.ROLES.COLLECTOR_ADMIN) ? (
                              <CalendarPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/dashboard"
                          render={() => {
                            return userCan(config.ROLES.COLLECTOR_ADMIN) ? (
                              <DashboardPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />

                        <Route
                          exact
                          path="/view-problem-credit"
                          render={() => {
                            return userCan([
                              config.ROLES.COLLECTOR_ADMIN,
                              config.ROLES.COLLECTOR_FILIAL
                            ]) ? (
                              <ProbremLoanPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/view-problem-credit/users-list/:type"
                          render={() => {
                            return userCan([
                              config.ROLES.COLLECTOR_ADMIN,
                              config.ROLES.COLLECTOR_FILIAL
                            ]) ? (
                              <ExpiredCreditsPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/view-problem-credit/users-list/:type/:loan_id"
                          render={() => {
                            return userCan([
                              config.ROLES.COLLECTOR_ADMIN,
                              config.ROLES.COLLECTOR_FILIAL
                            ]) ? (
                              <ExpiredCreditsUserPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />

                        <Route
                          exact
                          path="/employees-roles"
                          render={() => {
                            return userCan([
                              config.ROLES.COLLECTOR_ADMIN,
                              config.ROLES.COLLECTOR_FILIAL_MANAGER
                            ]) ? (
                              <LinkedEmployeesPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />

                        <Route
                          exact
                          path="/employees-attachment/:type"
                          render={() => {
                            return userCan([
                              config.ROLES.COLLECTOR_ADMIN,
                              config.ROLES.COLLECTOR_FILIAL_MANAGER
                            ]) ? (
                              <LinkedLoansPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/employees-attachment/:type/:loan_id"
                          render={() => {
                            return userCan([
                              config.ROLES.COLLECTOR_ADMIN,
                              config.ROLES.COLLECTOR_FILIAL_MANAGER
                            ]) ? (
                              <ViewPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/my-credits"
                          render={() => {
                            return userCan([
                              config.ROLES.COLLECTOR_ADMIN,
                              config.ROLES.COLLECTOR_FILIAL_MANAGER,
                              config.ROLES.COLLECTOR_FILIAL
                            ]) ? (
                              <MyCreditsPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/my-credits/:loan_id"
                          render={() => {
                            return userCan([
                              config.ROLES.COLLECTOR_ADMIN,
                              config.ROLES.COLLECTOR_FILIAL_MANAGER,
                              config.ROLES.COLLECTOR_FILIAL
                            ]) ? (
                              <MyCreditsUserPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/bonus"
                          render={() => {
                            return userCan([config.ROLES.COLLECTOR_ADMIN]) ? (
                              <KpiPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/my-bonus"
                          render={() => {
                            return userCan([
                              config.ROLES.COLLECTOR_ADMIN,
                              config.ROLES.COLLECTOR_FILIAL_MANAGER,
                              config.ROLES.COLLECTOR_FILIAL
                            ]) ? (
                              <KpiUser />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/employees-list/:user_id"
                          render={() => {
                            return userCan([
                              config.ROLES.COLLECTOR_ADMIN,
                              config.ROLES.COLLECTOR_FILIAL_MANAGER
                            ]) ? (
                              <EmployeesCreditsPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />

                        {/* TASK */}
                        <Route
                          exact
                          path="/monitoring/my-task"
                          render={() => {
                            return userCan([
                              config.ROLES.MONITORING_FILIAL,
                              config.ROLES.MONITORING_REGION,
                              config.ROLES.MONITORING_REPUBLIC,
                              config.ROLES.MONITORING_ADMIN,
                              config.ROLES.MONITORING_OPERATION,
                              config.ROLES.MONITORING_TREASURY
                            ]) ? (
                              <MyTaskPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />

                        <Route
                          exact
                          path="/monitoring/my-task/view/:id"
                          render={() => {
                            return userCan([
                              config.ROLES.MONITORING_FILIAL,
                              config.ROLES.MONITORING_REGION,
                              config.ROLES.MONITORING_REPUBLIC,
                              config.ROLES.MONITORING_ADMIN,
                              config.ROLES.MONITORING_OPERATION,
                              config.ROLES.MONITORING_TREASURY
                            ]) ? (
                              <MyTaskViewPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/monitoring/my-task/view/:id/:encoded"
                          render={() => {
                            return userCan([
                              config.ROLES.MONITORING_FILIAL,
                              config.ROLES.MONITORING_REGION,
                              config.ROLES.MONITORING_REPUBLIC,
                              config.ROLES.MONITORING_ADMIN,
                              config.ROLES.MONITORING_OPERATION,
                              config.ROLES.MONITORING_TREASURY
                            ]) ? (
                              <MyTaskViewPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/monitoring/all-task"
                          render={() => {
                            return userCan([
                              config.ROLES.MONITORING_FILIAL,
                              config.ROLES.MONITORING_REGION,
                              config.ROLES.MONITORING_REPUBLIC,
                              config.ROLES.MONITORING_ADMIN,
                              config.ROLES.MONITORING_OPERATION,
                              config.ROLES.MONITORING_TREASURY
                            ]) ? (
                              <AllTaskPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/monitoring/all-credits"
                          render={() => {
                            return userCan([
                              config.ROLES.MONITORING_FILIAL,
                              config.ROLES.MONITORING_REGION,
                              config.ROLES.MONITORING_REPUBLIC,
                              config.ROLES.MONITORING_ADMIN,
                              config.ROLES.MONITORING_OPERATION,
                              config.ROLES.MONITORING_TREASURY
                            ]) ? (
                              <MonitoringAllCredits />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />

                        {/* TASK */}
                        <Route
                          exact
                          path="/employees-list/:user_id/:loan_id"
                          render={() => {
                            return userCan([
                              config.ROLES.COLLECTOR_ADMIN,
                              config.ROLES.COLLECTOR_FILIAL_MANAGER
                            ]) ? (
                              <EmployeeCreditViewPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/rbac/auth-rule"
                          render={() => {
                            return userCan(config.ROLES.MONITORING_ADMIN) ? (
                              <RbacAuthRulePage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/rbac/auth-item"
                          render={() => {
                            return userCan(config.ROLES.MONITORING_ADMIN) ? (
                              <RbacAuthItemPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/rbac/auth-item-child"
                          render={() => {
                            return userCan(config.ROLES.MONITORING_ADMIN) ? (
                              <RbacAuthItemChildPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/rbac/auth-assignment"
                          render={() => {
                            return userCan(config.ROLES.MONITORING_ADMIN) ? (
                              <RbacAuthAssignmentPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/intentional/:type"
                          render={() => {
                            return userCan([
                              config.ROLES.COLLECTOR_ADMIN,
                              config.ROLES.COLLECTOR_FILIAL_MANAGER,
                              config.ROLES.RESPUBLIC
                            ]) ? (
                              <IntentionalPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/intentional/:type/:loan_id"
                          render={() => {
                            return userCan([
                              config.ROLES.COLLECTOR_ADMIN,
                              config.ROLES.COLLECTOR_FILIAL_MANAGER,
                              config.ROLES.RESPUBLIC
                            ]) ? (
                              <IntentionalViewPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/formed-list"
                          render={() => {
                            return userCan([
                              config.ROLES.COLLECTOR_ADMIN,
                              config.ROLES.COLLECTOR_FILIAL_MANAGER,
                              config.ROLES.RESPUBLIC
                            ]) ? (
                              <FormedListPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/formed-list/:address"
                          render={() => {
                            return userCan([
                              config.ROLES.COLLECTOR_ADMIN,
                              config.ROLES.COLLECTOR_FILIAL_MANAGER,
                              config.ROLES.RESPUBLIC
                            ]) ? (
                              <FormedListPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/formed-list/view/:loan_id"
                          render={() => {
                            return userCan([
                              config.ROLES.COLLECTOR_ADMIN,
                              config.ROLES.COLLECTOR_FILIAL_MANAGER,
                              config.ROLES.RESPUBLIC
                            ]) ? (
                              <FormedListViewPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/respublic/judges"
                          render={() => {
                            return userCan([
                              config.ROLES.COLLECTOR_ADMIN,
                              config.ROLES.COLLECTOR_FILIAL_MANAGER,
                              config.ROLES.RESPUBLIC
                            ]) ? (
                              <RespublicJudgeToTal />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/respublic/judges/:address"
                          render={() => {
                            return userCan([
                              config.ROLES.COLLECTOR_ADMIN,
                              config.ROLES.COLLECTOR_FILIAL_MANAGER,
                              config.ROLES.RESPUBLIC
                            ]) ? (
                              <RespublicJudgesPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/respublic/judges/view/:loan_id"
                          render={() => {
                            return userCan([
                              config.ROLES.COLLECTOR_ADMIN,
                              config.ROLES.COLLECTOR_FILIAL_MANAGER,
                              config.ROLES.RESPUBLIC
                            ]) ? (
                              <RespublicJudgesView />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />

                        <Route
                          exact
                          path="/respublic/monitoring"
                          render={() => {
                            return userCan([
                              config.ROLES.COLLECTOR_ADMIN,
                              config.ROLES.COLLECTOR_FILIAL_MANAGER,
                              config.ROLES.RESPUBLIC
                            ]) ? (
                              <RespublicMonitoringTotal />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/respublic/monitoring/:address"
                          render={() => {
                            return userCan([
                              config.ROLES.COLLECTOR_ADMIN,
                              config.ROLES.COLLECTOR_FILIAL_MANAGER,
                              config.ROLES.RESPUBLIC
                            ]) ? (
                              <RespublicMonitoringPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/respublic/monitoring/view/:loan_id"
                          render={() => {
                            return userCan([
                              config.ROLES.COLLECTOR_ADMIN,
                              config.ROLES.COLLECTOR_FILIAL_MANAGER,
                              config.ROLES.RESPUBLIC
                            ]) ? (
                              <RespublicMonitoringViewPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/judge-process"
                          render={() => {
                            return userCan([
                              config.ROLES.COLLECTOR_ADMIN,
                              config.ROLES.COLLECTOR_FILIAL_MANAGER,
                              config.ROLES.RESPUBLIC
                            ]) ? (
                              <JuridicProcessPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/judge-process/:address"
                          render={() => {
                            return userCan([
                              config.ROLES.COLLECTOR_ADMIN,
                              config.ROLES.COLLECTOR_FILIAL_MANAGER,
                              config.ROLES.RESPUBLIC
                            ]) ? (
                              <JuridicProcessPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/judge-process/view/:loan_id"
                          render={() => {
                            return userCan([
                              config.ROLES.COLLECTOR_ADMIN,
                              config.ROLES.COLLECTOR_FILIAL_MANAGER,
                              config.ROLES.RESPUBLIC
                            ]) ? (
                              <JuridicProcessView />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/sixty-ninty"
                          render={() => {
                            return userCan([
                              config.ROLES.COLLECTOR_ADMIN,
                              config.ROLES.COLLECTOR_FILIAL_MANAGER,
                              config.ROLES.RESPUBLIC
                            ]) ? (
                              <SixtyNintyPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/sixty-ninty/:address"
                          render={() => {
                            return userCan([
                              config.ROLES.COLLECTOR_ADMIN,
                              config.ROLES.COLLECTOR_FILIAL_MANAGER,
                              config.ROLES.RESPUBLIC
                            ]) ? (
                              <SixtyNintyPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/sixty-ninty/view/:loan_id"
                          render={() => {
                            return userCan([
                              config.ROLES.COLLECTOR_ADMIN,
                              config.ROLES.COLLECTOR_FILIAL_MANAGER,
                              config.ROLES.RESPUBLIC
                            ]) ? (
                              <SixtyNintyView />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/monitoring"
                          render={() => {
                            return userCan([
                              config.ROLES.COLLECTOR_ADMIN,
                              config.ROLES.COLLECTOR_FILIAL_MANAGER,
                              config.ROLES.RESPUBLIC
                            ]) ? (
                              <MonitoringPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/monitoring/report"
                          render={() => {
                            return userCan([
                              config.ROLES.MONITORING_REPUBLIC,
                              config.ROLES.MONITORING_ADMIN,
                              config.ROLES.MONITORING_OPERATION,
                              config.ROLES.MONITORING_TREASURY,
                              config.ROLES.MONITORING_REGION
                            ]) ? (
                              <MonitoringReport />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/monitoring/report/:encoded"
                          render={() => {
                            return userCan([
                              config.ROLES.MONITORING_REPUBLIC,
                              config.ROLES.MONITORING_ADMIN,
                              config.ROLES.MONITORING_OPERATION,
                              config.ROLES.MONITORING_TREASURY,
                              config.ROLES.MONITORING_REGION
                            ]) ? (
                              <MonitoringReport />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/monitoring/:address"
                          render={() => {
                            return userCan([
                              config.ROLES.COLLECTOR_ADMIN,
                              config.ROLES.COLLECTOR_FILIAL_MANAGER,
                              config.ROLES.RESPUBLIC
                            ]) ? (
                              <MonitoringPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/monitoring/view/:loan_id"
                          render={() => {
                            return userCan([
                              config.ROLES.COLLECTOR_ADMIN,
                              config.ROLES.COLLECTOR_FILIAL_MANAGER,
                              config.ROLES.RESPUBLIC
                            ]) ? (
                              <MonitoringViewPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/upload-video"
                          render={() => {
                            return userCan([config.ROLES.STREAM_ADMIN]) ? (
                              <UpdateLayout>
                                <UploadVideoPage />
                              </UpdateLayout>
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/daily-history"
                          render={() => {
                            return userCan([
                              config.ROLES.STREAM_ADMIN,
                              config.ROLES.STREAM_TAB_ADMIN
                            ]) ? (
                              <UpdateLayout>
                                <DailyHistoryPage />
                              </UpdateLayout>
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/vacancy/list"
                          render={() => {
                            return userCan([
                              config.ROLES.VACANCY_DEPARTMENT_MANAGER,
                              config.ROLES.VACANCY_FILIAL_MANAGER,
                              config.ROLES.VACANCY_HR_MANAGER
                            ]) ? (
                              <VacanciesPage userCan={userCan} />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/vacancy/candidates"
                          render={() => {
                            return userCan([
                              config.ROLES.VACANCY_HR_MANAGER,
                              config.ROLES.VACANCY_FILIAL_MANAGER,
                              config.ROLES.VACANCY_DEPARTMENT_MANAGER
                            ]) ? (
                              <CandidateApplicationsPage userCan={userCan} />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/vacancy/candidate/:id"
                          render={() => {
                            return userCan([
                              config.ROLES.VACANCY_FILIAL_MANAGER,
                              config.ROLES.VACANCY_DEPARTMENT_MANAGER,
                              config.ROLES.VACANCY_HR_MANAGER
                            ]) ? (
                              <CandidateApplicationPage userCan={userCan} />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/vacancy/apply-candidate-info/:id"
                          render={() => {
                            return userCan([
                              config.ROLES.VACANCY_HR_MANAGER,
                              config.ROLES.VACANCY_FILIAL_MANAGER
                            ]) ? (
                              <ApplyCandidateApplicationPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/vacancy/apply-candidate-files/:id"
                          render={() => {
                            return userCan([
                              config.ROLES.VACANCY_HR_MANAGER,
                              config.ROLES.VACANCY_FILIAL_MANAGER
                            ]) ? (
                              <ApplyCandidateFilesPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/vacancy/statistics"
                          render={() => {
                            return userCan([
                              config.ROLES.VACANCY_HR_MANAGER,
                              config.ROLES.VACANCY_FILIAL_MANAGER
                            ]) ? (
                              <VacancyDashboardPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/vacancy/settings"
                          render={() => {
                            return userCan([
                              config.ROLES.VACANCY_HR_MANAGER
                            ]) ? (
                              <VacancySettingsCreateRolePage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/vacancy/candidate-questions/:id"
                          render={() => {
                            return userCan([
                              config.ROLES.VACANCY_DEPARTMENT_MANAGER
                            ]) ? (
                              <VacancyCandidateQuestionsPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/vacancy/create/role"
                          render={() => {
                            return userCan([
                              config.ROLES.VACANCY_HR_MANAGER
                            ]) ? (
                              <VacancySettingsCreateRolePage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/vacancy/give/role"
                          render={() => {
                            return userCan([
                              config.ROLES.VACANCY_HR_MANAGER
                            ]) ? (
                              <VacancySettingsGiveRolePage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/vacancy/revert/role"
                          render={() => {
                            return userCan([
                              config.ROLES.VACANCY_HR_MANAGER
                            ]) ? (
                              <VacancySettingsRevertRolePage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/vacancy/revert/role"
                          render={() => {
                            return userCan([
                              config.ROLES.VACANCY_HR_MANAGER
                            ]) ? (
                              <VacancySettingsRevertRolePage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        {/* currency start */}
                        <Route
                          exact
                          path="/currency/view/:id"
                          render={() => {
                            return userCan(config.ROLES.CURRENCY) ? (
                              <CurrencyRatesViewPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />

                        <Route
                          exact
                          path="/currency/create"
                          render={() => {
                            return userCan(config.ROLES.CURRENCY) ? (
                              <CurrencyRatesCreatePage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/currency/update/:id"
                          render={() => {
                            return userCan(config.ROLES.CURRENCY) ? (
                              <CurrencyRatesUpdatePage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/currency/list"
                          render={() => {
                            return userCan(config.ROLES.CURRENCY) ? (
                              <TabsLayoutCurrency>
                                <CurrencyRatesListPage />
                              </TabsLayoutCurrency>
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/currency/today"
                          render={() => {
                            return userCan(config.ROLES.CURRENCY) ? (
                              <TabsLayoutCurrency>
                                <CurrencyRatesListTodayPage />
                              </TabsLayoutCurrency>
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/deposit-employee/list"
                          render={() => {
                            return userCan(config.ROLES.RESPUBLIC) ? (
                              <DepositEmployeeViewListPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        {/* currency end */}

                        {/* currency-juridic start */}
                        <Route
                          exact
                          path="/currency-juridic/view/:id"
                          render={() => {
                            return userCan(config.ROLES.COURSE) ? (
                              <CurrencyJuridicRatesViewPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />

                        <Route
                          exact
                          path="/currency-juridic/create"
                          render={() => {
                            return userCan(config.ROLES.COURSE) ? (
                              <CurrencyJuridicRatesCreatePage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/currency/update/:id"
                          render={() => {
                            return userCan(config.ROLES.CURRENCY) ? (
                              <CurrencyJuridicRatesUpdatePage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/currency-juridic/list"
                          render={() => {
                            return userCan(config.ROLES.COURSE) ? (
                              <TabsLayoutCurrencyJuridic>
                                <CurrencyJuridicRatesListPage />
                              </TabsLayoutCurrencyJuridic>
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/currency-juridic/today"
                          render={() => {
                            return userCan(config.ROLES.COURSE) ? (
                              <TabsLayoutCurrencyJuridic>
                                <CurrencyJuridicRatesListTodayPage />
                              </TabsLayoutCurrencyJuridic>
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/deposit-employee/list"
                          render={() => {
                            return userCan(config.ROLES.RESPUBLIC) ? (
                              <DepositEmployeeViewListPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        {/* currency-juridic end */}
                        <Route
                          exact
                          path="/language"
                          render={() => {
                            return userCan(config.ROLES.LANGUAGE_ADMIN) ? (
                              <MessageContainer />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        ></Route>
                        <Route
                          exact
                          path="/send-sms/main"
                          render={() => {
                            return userCan(config.ROLES.SMS_ADMIN) ? (
                              <TabsLayoutSms>
                                <SendSmsPage />
                              </TabsLayoutSms>
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        ></Route>
                        <Route
                          exact
                          path="/send-sms/monitoring"
                          render={() => {
                            return userCan(config.ROLES.SMS_ADMIN) ? (
                              <TabsLayoutSms>
                                <SendSmsMonitoringPage />
                              </TabsLayoutSms>
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        ></Route>
                        <Route
                          exact
                          path="/send-sms/category"
                          render={() => {
                            return userCan(config.ROLES.SMS_ADMIN) ? (
                              <TabsLayoutSms>
                                <SendSmsCreateCategoryPage />
                              </TabsLayoutSms>
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        ></Route>
                        <Route
                          exact
                          path="/send-sms/job"
                          render={() => {
                            return userCan(config.ROLES.SMS_ADMIN) ? (
                              <TabsLayoutSms>
                                <SendSmsProcessPage />
                              </TabsLayoutSms>
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        ></Route>

                        <Route
                          exact
                          path="/language/create"
                          render={() => {
                            return userCan(config.ROLES.LANGUAGE_ADMIN) ? (
                              <CreateMessage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        ></Route>
                        <Route
                          exact
                          path="/language/update/:id"
                          render={() => {
                            return userCan(config.ROLES.LANGUAGE_ADMIN) ? (
                              <UpdateMessage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        ></Route>
                        <Route
                          exact
                          path="/katm/active-requests"
                          render={() => {
                            return userCan(config.ROLES.FACE_CONTROL_ADMIN) ? (
                              <ActiveRequests />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        ></Route>

                        <Route
                          exact
                          path="/katm/monitoring"
                          render={() => {
                            return userCan(config.ROLES.FACE_CONTROL_ADMIN) ? (
                              <Monitoring />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />

                        <Route
                          exact
                          path="/katm/monitoring/view/:id"
                          render={() => {
                            return userCan(config.ROLES.FACE_CONTROL_ADMIN) ? (
                              <MonitoringViewContainer />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-monitoring/branch-loans"
                          render={() => {
                            return userCan(config.ROLES.MONITORING_FILIAL) ? (
                              <BranchLoansPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-monitoring/branch/purpose"
                          render={() => {
                            return userCan(config.ROLES.MONITORING_FILIAL) ? (
                              <BranchPurposePage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-monitoring/branch/purpose/view"
                          render={() => {
                            return userCan(config.ROLES.MONITORING_FILIAL) ? (
                              <BranchPurposePage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-monitoring/branch/purpose/view/:id"
                          render={() => {
                            return userCan(config.ROLES.MONITORING_FILIAL) ? (
                              <BranchPurposeView />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-monitoring/branch/continuous"
                          render={() => {
                            return userCan(config.ROLES.MONITORING_FILIAL) ? (
                              <BranchContinuousPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-monitoring/branch/continuous/view/:id"
                          render={() => {
                            return userCan(config.ROLES.MONITORING_FILIAL) ? (
                              <BranchContinuousView />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-monitoring/region-loans"
                          render={() => {
                            return userCan([
                              config.ROLES.MONITORING_REGION,
                              config.ROLES.MONITORING_PROBLEM_REGION
                            ]) ? (
                              <RegionLoansPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-monitoring/region/purpose"
                          render={() => {
                            return userCan(config.ROLES.MONITORING_REGION) ? (
                              <RegionPurposePage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />

                        <Route
                          exact
                          path="/credit-monitoring/region/purpose/view/:id"
                          render={() => {
                            return userCan(config.ROLES.MONITORING_REGION) ? (
                              <RegionPurposeView />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-monitoring/region/continuous"
                          render={() => {
                            return userCan(config.ROLES.MONITORING_REGION) ? (
                              <RegionContinuousPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-monitoring/region/continuous/view/:id"
                          render={() => {
                            return userCan(config.ROLES.MONITORING_REGION) ? (
                              <RegionContinuousView />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-monitoring/my-loan/view/:id"
                          render={() => {
                            return userCan([
                              config.ROLES.MONITORING_FILIAL,
                              config.ROLES.MONITORING_REGION,
                              config.ROLES.MONITORING_REPUBLIC,
                              config.ROLES.MONITORING_ADMIN
                            ]) ? (
                              <MyLoanViewPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-monitoring/documents"
                          render={() => {
                            return userCan([
                              config.ROLES.MONITORING_ADMIN,
                              config.ROLES.MONITORING_REGION
                            ]) ? (
                              <CreditMonitoringDocumentsPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-monitoring/documents/create"
                          render={() => {
                            return userCan([
                              config.ROLES.MONITORING_ADMIN,
                              config.ROLES.MONITORING_REGION
                            ]) ? (
                              <CreditDocumentCreatePage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-monitoring/documents/update/:id"
                          render={() => {
                            return userCan([
                              config.ROLES.MONITORING_ADMIN,
                              config.ROLES.MONITORING_REGION
                            ]) ? (
                              <CreditMonitoringUpdatePage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-monitoring/documents/:encoded"
                          render={() => {
                            return userCan([
                              config.ROLES.MONITORING_ADMIN,
                              config.ROLES.MONITORING_REGION
                            ]) ? (
                              <CreditMonitoringDocumentsPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-monitoring/stages"
                          render={() => {
                            return userCan([
                              config.ROLES.MONITORING_PROBLEM_REPUBLIC
                            ]) ? (
                              <CreditMonitoringStagesPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-monitoring/stages/view/:id"
                          render={() => {
                            return userCan([
                              config.ROLES.MONITORING_PROBLEM_REPUBLIC
                            ]) ? (
                              <CreditMonitoringStagesViewPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-monitoring/stages/create"
                          render={() => {
                            return userCan([
                              config.ROLES.MONITORING_PROBLEM_REPUBLIC
                            ]) ? (
                              <CreditMonitoringStagesCreatePage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-monitoring/stages/update/:id"
                          render={() => {
                            return userCan([
                              config.ROLES.MONITORING_PROBLEM_REPUBLIC
                            ]) ? (
                              <CreditMonitoringStagesUpdatePage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-monitoring/access"
                          render={() => {
                            return userCan([
                              config.ROLES.MONITORING_PROBLEM_REPUBLIC
                            ]) ? (
                              <CreditMonitoringAccessPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-monitoring/products"
                          render={() => {
                            return userCan([
                              config.ROLES.MONITORING_ADMIN,
                              config.ROLES.MONITORING_REGION
                            ]) ? (
                              <CreditMonitoringRequirementsPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />

                        <Route
                          exact
                          path="/credit-monitoring/product/view/:id"
                          render={() => {
                            return userCan([
                              config.ROLES.MONITORING_ADMIN,
                              config.ROLES.MONITORING_REGION
                            ]) ? (
                              <CreditMonitoringRequirementsViewPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-monitoring/books"
                          render={() => {
                            return userCan([
                              config.ROLES.MONITORING_ADMIN,
                              config.ROLES.MONITORING_REGION
                            ]) ? (
                              <CreditMonitoringBooksPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-monitoring/book/view/:code"
                          render={() => {
                            return userCan([
                              config.ROLES.MONITORING_ADMIN,
                              config.ROLES.MONITORING_REGION
                            ]) ? (
                              <CreditMonitoringBookViewPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-monitoring/branches/republic"
                          render={() => {
                            return userCan([
                              config.ROLES.MONITORING_ADMIN,
                              config.ROLES.MONITORING_REGION
                            ]) ? (
                              <CreditMonitoringRepublicPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-monitoring/branches/employees"
                          render={() => {
                            return userCan([
                              config.ROLES.MONITORING_ADMIN,
                              config.ROLES.MONITORING_REGION
                            ]) ? (
                              <CreditMonitoringEmployeesPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-monitoring/branches/employee/view/:emp_id"
                          render={() => {
                            return userCan([
                              config.ROLES.MONITORING_ADMIN,
                              config.ROLES.MONITORING_REGION
                            ]) ? (
                              <CreditMonitoringEmployeeView />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-monitoring/branches/republic/view/:code"
                          render={() => {
                            return userCan([
                              config.ROLES.MONITORING_ADMIN,
                              config.ROLES.MONITORING_REGION
                            ]) ? (
                              <CreditMonitoringRepublicViewPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-monitoring/loan-details"
                          render={() => {
                            return userCan([
                              config.ROLES.MONITORING_PROBLEM_REPUBLIC,
                              config.ROLES.MONITORING_PROBLEM_REGION,
                              config.ROLES.MONITORING_PROBLEM_FILIAL
                            ]) ? (
                              <CreditMonitoringLoanDetailsPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-monitoring/expired-loans"
                          render={() => {
                            return userCan([
                              config.ROLES.MONITORING_PROBLEM_FILIAL,
                              config.ROLES.MONITORING_PROBLEM_REGION,
                              config.ROLES.MONITORING_PROBLEM_REPUBLIC
                            ]) ? (
                              <CreditMonitoringExpiredLoansPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-monitoring/expired-loan/view/:id"
                          render={() => {
                            return userCan([
                              config.ROLES.MONITORING_PROBLEM_FILIAL,
                              config.ROLES.MONITORING_PROBLEM_REGION,
                              config.ROLES.MONITORING_PROBLEM_REPUBLIC
                            ]) ? (
                              <ExpiredLoanViewPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-monitoring/controls-loans"
                          render={() => {
                            return userCan([
                              config.ROLES.MONITORING_PROBLEM_FILIAL,
                              config.ROLES.MONITORING_PROBLEM_REGION,
                              config.ROLES.MONITORING_PROBLEM_REPUBLIC
                            ]) ? (
                              <CreditMonitoringControlsLoansPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-monitoring/npl-report"
                          render={() => {
                            return userCan([
                              config.ROLES.MONITORING_PROBLEM_FILIAL,
                              config.ROLES.MONITORING_PROBLEM_REPUBLIC,
                              config.ROLES.MONITORING_PROBLEM_REGION
                            ]) ? (
                              <CreditMonitoringNplReportPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                          <Route
                              exact
                              path="/credit-monitoring/about"
                              render={() => {
                                return userCan([
                                  config.ROLES.MONITORING_PROBLEM_FILIAL,
                                  config.ROLES.MONITORING_PROBLEM_REPUBLIC,
                                  config.ROLES.MONITORING_PROBLEM_REGION
                                ]) ? (
                                    <CreditMonitoringNplAboutPage />
                                ) : (
                                    <AccessDenied />
                                );
                              }}
                          />
                        <Route
                          exact
                          path="/credit-monitoring/npl-progress"
                          render={() => {
                            return userCan([
                              config.ROLES.MONITORING_PROBLEM_REPUBLIC
                            ]) ? (
                              <CreditMonitoringNplProgressPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-problem/access"
                          render={() => {
                            return userCan([
                              config.ROLES.MONITORING_PROBLEM_REPUBLIC
                            ]) ? (
                              <CreditMonitoringAccessPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />

                        <Route
                          exact
                          path="/credit-monitoring/employees"
                          render={() => {
                            return userCan([
                              config.ROLES.BONUS_FILIAL_REGISTRAR
                            ]) ? (
                              <CreditMonitoringBonusEmployeesPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-monitoring/employees/bonus"
                          render={() => {
                            return userCan([
                              config.ROLES.BONUS_FILIAL_REGISTRAR
                            ]) ? (
                              <CreditMonitoringBonusEmployeesSheetPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-monitoring/employees/bonus/view/:id"
                          render={() => {
                            return userCan([
                              config.ROLES.BONUS_FILIAL_REGISTRAR
                            ]) ? (
                              <CreditMonitoringBonusEmployeesPageView />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-monitoring/my-bonuses"
                          render={() => {
                            return userCan([
                              config.ROLES.BONUS_FILIAL_REGISTRAR
                            ]) ? (
                              <CreditMonitoringBonusPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-monitoring/employee/create"
                          render={() => {
                            return userCan([
                              config.ROLES.BONUS_FILIAL_REGISTRAR
                            ]) ? (
                              <CreditMonitoringBonusEmployeeCreatePage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />

                        <Route
                          exact
                          path="/credit-monitoring/loans-attachment"
                          render={() => {
                            return userCan([
                              config.ROLES.BONUS_FILIAL_REGISTRAR
                            ]) ? (
                              <AttachmentPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/credit-monitoring/my-attachments"
                          render={() => {
                            return userCan([
                              config.ROLES.BONUS_FILIAL_REGISTRAR
                            ]) ? (
                              <MyAttachmentPage />
                            ) : (
                              <AccessDenied />
                            );
                          }}
                        />
                        <Route
                            exact
                            path="/credit-monitoring/loans"
                            render={() => {
                              return userCan([
                                config.ROLES.BONUS_FILIAL_REGISTRAR,
                              ]) ? (
                                  <CreditMonitoringLoansPage />
                              ) : (
                                  <AccessDenied />
                              );
                            }}
                        />
                        <Route
                            exact
                            path="/credit-monitoring/problem-loan/view/:loan_id"
                            render={() => {
                              return userCan([
                                config.ROLES.BONUS_FILIAL_REGISTRAR,
                              ]) ? (
                                  <CreditMonitoringLoanViewPage />
                              ) : (
                                  <AccessDenied />
                              );
                            }}
                        />
                        <Route
                          exact
                          path="/auth/appeal/create"
                          component={AppealCreate}
                        />
                        <Route
                          exact
                          path="/appeal/view"
                          component={AppealPage}
                        />
                        <Route
                          exact
                          path="/auth/logout"
                          component={LogoutPage}
                        />
                        <Redirect to="/home" />
                      </Switch>
                    );
                  }}
                </WithUser>
              </HasProfile>
              <HasNotProfile>
                <Switch>
                  <Route exact path="/auth/logout" component={LogoutPage} />
                  <Route
                    exact
                    path="/auth/link/employee"
                    component={LinkEmployeePage}
                  />
                  <Redirect to="/auth/link/employee" />
                </Switch>
              </HasNotProfile>
            </IsAuth>
            <IsGuest>
              <Switch>
                <Route exact path="/auth" component={LoginOrSignUpPage} />
                <Route exact path="/auth/login/:phone" component={LoginPage} />
                <Route
                  exact
                  path="/auth/approve/:token"
                  component={ApprovePage}
                />
                <Route
                  exact
                  path="/auth/appeal/create"
                  component={AppealCreate}
                />
                <Redirect to="/auth" />
              </Switch>
            </IsGuest>
          </LayoutManager>
        </AuthLoader>
      </WebRouter>
    );
  }
}

export default Router;
