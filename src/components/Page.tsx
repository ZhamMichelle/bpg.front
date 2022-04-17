import React, { createElement } from "react";
import { Switch, Route, BrowserRouter, } from "react-router-dom";
import { NavbarUp } from "./NavbarUp";
import { ClientElements } from "./clientCard/ClientElements";
import { ClientElement } from "./clientCard/ClientElement";
import { FormState } from "../services/Services";
import { AdvancedClient } from "./clientCard/AdvancedClient";

const Page = () => {
  // const createElement1 = (Component, props) => (
  //   props.route.dependencies = props.route.dependencies || {};
  //   return React.createElement(Component, { ...props, ...props.route.dependencies });
  // );
  return (
    <React.Fragment>
      <BrowserRouter>
      <NavbarUp />
      <Switch>
      {/* <Router> */}
        
        <Route exact path="/clients" component={ClientElements} />
        <Route
          path={`/:id/card/edit`} 
          component={(props:any) => (
            <ClientElement {...props} formState={FormState.EDIT} />
          )}
        />
        <Route
          path="/card/create"
          component={(props:any) => (
            <ClientElement {...props} formState={FormState.CREATE} />
          )}
        />
        <Route
          path={"/:id/card"}
          component={(props:any) => (
            <ClientElement {...props} formState={FormState.READ} />
          )}
        />
      {/* </Router> */}
      </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default Page;
