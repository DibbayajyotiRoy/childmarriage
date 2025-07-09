import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 1. Correctly import the layout and the new page "controller"
import MainLayout  from "./components/MainLayout"; // Assuming you moved it here
import MemberDashboardPage from "./dashboard/Member/page";

// (Assuming you will create these pages later)
// import AdminDashboardPage from './dashboard/Admin/page';
// import AuthorityDashboardPage from './dashboard/Authority/page';
// import NotFoundPage from './pages/NotFoundPage';

/**
 * The main application component that defines all routing.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*
          This parent route wraps all nested routes with the MainLayout.
          This means any page defined inside will have the sidebar and header.
        */}
        <Route path="/" element={<MainLayout />}>
          {/* 
            The `index` route defines the component to show for the root path "/".
            We'll make it the Member Dashboard for now.
          */}
          <Route index element={<MemberDashboardPage />} />

          {/* 
            2. Define the routes for the Member Dashboard.
            - Both the list view and the detail view point to the SAME component.
            - The `MemberDashboardPage` component uses the `useParams` hook internally
              to check if a `caseId` is present and renders the correct view.
          */}
          <Route path="/dashboard/member" element={<MemberDashboardPage />} />
          <Route
            path="/dashboard/member/:caseId"
            element={<MemberDashboardPage />}
          />

          {/* 
            Example of how you would add routes for other roles in the future.
            You would create `AdminDashboardPage`, etc., following the same pattern.
          */}
          {/*
          <Route path="/dashboard/admin" element={<AdminDashboardPage />} />
          <Route path="/dashboard/admin/:caseId" element={<AdminDashboardPage />} />
          <Route path="/dashboard/authority" element={<AuthorityDashboardPage />} />
          <Route path="/dashboard/authority/:caseId" element={<AuthorityDashboardPage />} />
          */}

          {/* 
            A "catch-all" route for any URL that doesn't match.
            This is a best practice for showing a 404 Not Found page.
          */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Route>

        {/* 
          You can define routes outside the MainLayout for pages
          that shouldn't have the sidebar, like a login page.
        */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
