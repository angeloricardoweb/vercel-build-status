# Setting Up Webhooks

A webhook is a trigger-based HTTP endpoint configured to receive HTTP POST requests through events. When an event happens, a webhook is sent to another third-party app, which can then take appropriate action.

Webhooks configured with Vercel can trigger a deployment when a specific event occurs. Vercel integrations receive platform events through webhooks.

## [Account Webhooks](#account-webhooks)

Account Webhooks are available on [Pro and Enterprise plans](/docs/plans/enterprise)

Vercel allows you to add a generic endpoint for events from your dashboard. [Pro](/docs/plans/pro) and [Enterprise](/docs/plans/enterprise) teams will be able to configure these webhooks at the account level.

### [Configure a webhook](#configure-a-webhook)

1.  ### [Go to your team settings](#go-to-your-team-settings)
    
    Choose your team scope on the dashboard, and go to Settings ➞ Webhooks.
    
2.  ### [Select the events to listen to](#select-the-events-to-listen-to)
    
    ![Select events for your webhooks to listen.](/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fv1689795055%2Fdocs-assets%2Fstatic%2Fdocs%2Fintegrations%2Fwebhooks%2Fwebhooks-add-events-light.png&w=1920&q=75)![Select events for your webhooks to listen.](/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fv1689795055%2Fdocs-assets%2Fstatic%2Fdocs%2Fintegrations%2Fwebhooks%2Fwebhooks-add-events-dark.png&w=1920&q=75)
    
    Select events for your webhooks to listen.
    
    The configured webhook listens to one or more events before it triggers the function request. Vercel supports event selections from the following categories:
    
    #### [Deployment Events](#deployment-events)
    
    Configurable webhooks listen to the following deployment-based events:
    
    *   Deployment Created: Listens for when any new deployment is initiated
    *   Deployment Succeeded: Listens for a successful deployment
    *   Deployment Promoted: Listens for when a deployment is promoted
    *   Deployment Error: Listens for any failed deployment
    *   Deployment Cancelled: Listens for a canceled deployment due to any failure
    
    #### [Project Events](#project-events)
    
    Project events are only available when "All Team Projects" is selected as the [project scope](#choose-your-target-projects).
    
    Configurable webhooks listen to the following project-based events:
    
    *   Project Created: Listens whenever a new project is created
    *   Project Removed: Listens whenever any project is deleted from the team account
    
    #### [Firewall events](#firewall-events)
    
    Configurable webhooks listen to the following firewall-based events:
    
    *   Attack Detected: Listens for when the [Vercel Firewall](/docs/vercel-firewall) detects and mitigates a [DDoS attack](/docs/security/ddos-mitigation)
    
    The events you select should depend on your use case and the workflow you want to implement.
    
3.  ### [Choose your target projects](#choose-your-target-projects)
    
    ![Choose the scope of project(s) for webhooks.](/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fv1687480824%2Fdocs-assets%2Fstatic%2Fdocs%2Fintegrations%2Fwebhooks%2Fproject-scope.png&w=1920&q=75)![Choose the scope of project(s) for webhooks.](/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fv1687480825%2Fdocs-assets%2Fstatic%2Fdocs%2Fintegrations%2Fwebhooks%2Fproject-scope-dark.png&w=1920&q=75)
    
    Choose the scope of project(s) for webhooks.
    
    After selecting the event types, choose the scope of team projects for which webhooks will listen for events.
    
4.  ### [Enter your endpoint URL](#enter-your-endpoint-url)
    
    The endpoint URL is the destination that triggers the events. All events are forwarded to this URL as a POST request. In case of an event, your webhook initiates an HTTP callback to this endpoint that you must configure to receive data. In order to be accessible, make sure these endpoint URLs are public.
    
    ![Define the endpoint URL for the webhooks to listen.](/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fv1705933134%2Fdocs-assets%2Fstatic%2Fdocs%2Fintegrations%2Fwebhooks%2Fenter-endpoint-light.png&w=1920&q=75)![Define the endpoint URL for the webhooks to listen.](/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fv1705933134%2Fdocs-assets%2Fstatic%2Fdocs%2Fintegrations%2Fwebhooks%2Fenter-endpoint-dark.png&w=1920&q=75)
    
    Define the endpoint URL for the webhooks to listen.
    
    Once you have configured your webhook, click the Create Webhook button.
    
    The Webhook Created dialog will display a secret key, which won't be shown again. You should secure your webhooks by comparing the [`x-vercel-signature`](/docs/headers#x-vercel-signature) header of an incoming request with this client secret. See [Securing webhooks](/docs/integrations/webhooks-overview/webhooks-api#securing-webhooks) to learn how to do this.
    
    ![Confirmation to create the webhook.](/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fv1705933108%2Fdocs-assets%2Fstatic%2Fdocs%2Fintegrations%2Fwebhooks%2Fwebhook-created-light.png&w=1080&q=75)![Confirmation to create the webhook.](/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fv1705933108%2Fdocs-assets%2Fstatic%2Fdocs%2Fintegrations%2Fwebhooks%2Fwebhook-created-dark.png&w=1080&q=75)
    
    Confirmation to create the webhook.
    
    Once complete, click Done.
    
    To view all your new and existing webhooks, go to the Webhooks section of your team's dashboard. To remove any webhook, click the cross icon next to the webhook. You can create and use up to 20 custom webhooks per team.
    

## [Integration Webhooks](#integration-webhooks)

Webhooks can also be created through [Integrations](/docs/integrations). When [creating a new integration](/docs/integrations/create-integration), you can add webhooks using the [Integration Console](/dashboard/integrations/create). Inside your Integration's settings page locate the text field for setting the webhook URL. This is where you should add the HTTP endpoint to listen for events. Next, you can select one or more of these checkboxes to specify which events to listen to.

![Specifying the webhook URL and events to listen to.](/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fv1687480825%2Fdocs-assets%2Fstatic%2Fdocs%2Fintegrations%2Fwebhooks%2Fwebhooks-url-integrations-light.png&w=1920&q=75)![Specifying the webhook URL and events to listen to.](/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fv1687480825%2Fdocs-assets%2Fstatic%2Fdocs%2Fintegrations%2Fwebhooks%2Fwebhooks-url-integrations-dark.png&w=1920&q=75)

Specifying the webhook URL and events to listen to.

## [Events](#events)

The webhook URL receives an HTTP POST request with a JSON payload for each event. All the events have the following format:

```
"id": <eventId>,
  "type": <event-type>,
  "createdAt": <javascript-timestamp>,
  "payload": <payload for the event>,
  "region": <RegionId>,
```

Here's a [list of supported event types](/docs/integrations/webhooks-overview/webhooks-api#supported-event-types) and their [`payload`](/docs/integrations/webhooks-overview/webhooks-api#payload).

Last updated on March 12, 2025