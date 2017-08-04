---
services: active-directory-b2c
platforms: javascript
author: parakhj
---

# Single-Page Application built using Angular2.4 and MSAL.js with Azure AD B2C

> **IMPORTANT NOTE: Calling an API is not yet shown**

This simple sample demonstrates how to use the [Microsoft Authentication Library Preview for JavaScript (msal.js)](https://github.com/AzureAD/microsoft-authentication-library-for-js) with Angular 2.4 to sign into Azure AD B2C.

## How To Run This Sample

The sample is already configured to use a demo environment and can be run simply by downloading the code and running the app on your machine. Follow the instructions below if you would like to use your own Azure AD B2C configuration.

Optionally, if you want to use your own tenant configuration: 

### Step 1: Get your own Azure AD B2C tenant

You can also modify the sample to use your own Azure AD B2C tenant.  First, you'll need to create an Azure AD B2C tenant by following [these instructions](https://azure.microsoft.com/documentation/articles/active-directory-b2c-get-started).

> *IMPORTANT*: if you choose to perform one of the optional steps, you have to perform ALL of them for the sample to work as expected.

### Step 2: Create your own policies

This sample uses three types of policies: a unified sign-up/sign-in policy & a profile editing policy.  Create one policy of each type by following [the instructions here](https://azure.microsoft.com/documentation/articles/active-directory-b2c-reference-policies).  You may choose to include as many or as few identity providers as you wish.

If you already have existing policies in your Azure AD B2C tenant, feel free to re-use those.  No need to create new ones just for this sample.

### Step 3: Create your own application

Now you need to [register your single page application in your B2C tenant](https://docs.microsoft.com/azure/active-directory-b2c/active-directory-b2c-app-registration#register-a-web-application), so that it has its own Application ID. Don't forget to grant your application API Access to the web API you registered in the previous step.

Your single page application registration should include the following information:

- Enable the **Web App/Web API** setting for your application.
- Set the **Reply URL** for your app to `https://localhost:3000`
- Copy the Application ID generated for your application, so you can use it in the next step.

### Step 4: Configure the sample to use your Azure AD B2C tenant

Now you can replace the app's default configuration with your own.  

1. Open the `msal.service.ts` file.
1. Find the assignment for `ClientID` and replace the value with the Application ID from Step 3.
1. Find the assignment for `authority` and replacing `b2c_1_susi`by the name of the policy you created in Step 2, and `fabrikamb2c.onmicrosoft.com` by the name of the Azure AD B2C tenant.

```javascript
tenantConfig = {
    tenant: "fabrikamb2c.onmicrosoft.com",
    clientID: '90c0fe63-bcf2-44d5-8fb7-b8bbc0b29dc6',
    signUpSignInPolicy: "b2c_1_susi",
    b2cScopes: ["https://fabrikamb2c.onmicrosoft.com/demoapi/demo.read"]
};
```

### Step 5: Run the sample

1. Make sure you've [installed Node](https://nodejs.org/en/download/).
1. Install the node dependencies:        
    ```powershell
    cd active-directory-b2c-javascript-angular2.4-spa
    npm install
    npm update
    ```       
1. Run the Web application       
    ```powershell
    npm start
    ```      
1. With your favorite browser, navigate to `https://localhost:3000`.
1. Click the **login** button at the top of the application screen. The sample works exactly in the same way regardless of the account type you choose, apart from some visual differences in the authentication and consent experience.
1. Sign out by clicking the **Logout** button.  

## More information
For more information on Azure B2C, see [the Azure AD B2C documentation homepage](http://aka.ms/aadb2c). 

## Community Help and Support
We use Stack Overflow with the [msal](https://stackoverflow.com/questions/tagged/msal) and [azure-ad-b2c](https://stackoverflow.com/questions/tagged/azure-ad-b2c) tags to provide support. We highly recommend you ask your questions on Stack Overflow first and browse existing issues to see if someone has asked your question before. Make sure that your questions or comments are tagged with [msal.js].

If you find and bug or have a feature request, please raise the issue on [GitHub Issues](../../issues). 

To provide a recommendation, visit our [Feedback Forum](http://aka.ms/aadb2cuv).

## Contributing

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
