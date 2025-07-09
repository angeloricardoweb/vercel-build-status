# Webhooks API Reference

Vercel Integrations allow you to subscribe to certain trigger-based events through webhooks. An example use-cases for webhooks might be cleaning up resources after someone removes your Integration.

## [Payload](#payload)

The webhook payload is a JSON object with the following keys.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| type | [String](/docs/rest-api#introduction/api-basics/types) | The [event type](#supported-event-types). |
| id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the webhook delivery. |
| createdAt | [Date](/docs/rest-api#introduction/api-basics/types) | The webhook delivery timestamp. |
| region | [String](/docs/rest-api#introduction/api-basics/types) | The region the event occurred in (possibly null). |
| payload | [Object](/docs/rest-api#introduction/api-basics/types) | The payload of the webhook. See [Supported Event Types](#supported-event-types) for more information. |

## [Supported Event Types](#supported-event-types)

### [deployment.canceled](#deployment.canceled)

Occurs whenever a deployment is canceled.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.team.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's team (possibly null). |
| payload.user.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's user. |
| payload.deployment.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the deployment. |
| payload.deployment.meta | [Map](/docs/rest-api#introduction/api-basics/types) | A Map of deployment metadata. |
| payload.deployment.url | [String](/docs/rest-api#introduction/api-basics/types) | The URL of the deployment. |
| payload.deployment.name | [String](/docs/rest-api#introduction/api-basics/types) | The project name used in the deployment URL. |
| payload.links.deployment | [String](/docs/rest-api#introduction/api-basics/types) | The URL on the Vercel Dashboard to inspect the deployment. |
| payload.links.project | [String](/docs/rest-api#introduction/api-basics/types) | The URL on the Vercel Dashboard to the project. |
| payload.target | [String](/docs/rest-api#introduction/api-basics/types) | A String that indicates the target. Possible values are `production`, `staging` or `null`. |
| payload.project.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the project. |
| payload.plan | [String](/docs/rest-api#introduction/api-basics/types) | The plan type of the deployment. |
| payload.regions | [List](/docs/rest-api#introduction/api-basics/types) | An array of the supported regions for the deployment. |

### [deployment.check-rerequested](#deployment.check-rerequested)

Occurs when a user has requested for a [check](/docs/integrations/checks-overview) to be rerun after it failed.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.team.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's team (possibly null). |
| payload.user.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's user. |
| payload.deployment.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the deployment. |
| payload.check.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the check. |

### [deployment.created](#deployment.created)

Occurs whenever a deployment is created.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.team.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's team (possibly null). |
| payload.user.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's user. |
| payload.alias | [List](/docs/rest-api#introduction/api-basics/types) | An array of aliases that will get assigned when the deployment is ready. |
| payload.deployment.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the deployment. |
| payload.deployment.meta | [Map](/docs/rest-api#introduction/api-basics/types) | A Map of deployment metadata. |
| payload.deployment.url | [String](/docs/rest-api#introduction/api-basics/types) | The URL of the deployment. |
| payload.deployment.name | [String](/docs/rest-api#introduction/api-basics/types) | The project name used in the deployment URL. |
| payload.links.deployment | [String](/docs/rest-api#introduction/api-basics/types) | The URL on the Vercel Dashboard to inspect the deployment. |
| payload.links.project | [String](/docs/rest-api#introduction/api-basics/types) | The URL on the Vercel Dashboard to the project. |
| payload.target | [String](/docs/rest-api#introduction/api-basics/types) | A String that indicates the target. Possible values are `production`, `staging` or `null`. |
| payload.project.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the project. |
| payload.plan | [String](/docs/rest-api#introduction/api-basics/types) | The plan type of the deployment. |
| payload.regions | [List](/docs/rest-api#introduction/api-basics/types) | An array of the supported regions for the deployment. |

### [deployment.error](#deployment.error)

Occurs whenever a deployment has failed.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.team.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's team (possibly null). |
| payload.user.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's user. |
| payload.deployment.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the deployment. |
| payload.deployment.meta | [Map](/docs/rest-api#introduction/api-basics/types) | A Map of deployment metadata. |
| payload.deployment.url | [String](/docs/rest-api#introduction/api-basics/types) | The URL of the deployment. |
| payload.deployment.name | [String](/docs/rest-api#introduction/api-basics/types) | The project name used in the deployment URL. |
| payload.links.deployment | [String](/docs/rest-api#introduction/api-basics/types) | The URL on the Vercel Dashboard to inspect the deployment. |
| payload.links.project | [String](/docs/rest-api#introduction/api-basics/types) | The URL on the Vercel Dashboard to the project. |
| payload.target | [String](/docs/rest-api#introduction/api-basics/types) | A String that indicates the target. Possible values are `production`, `staging` or `null`. |
| payload.project.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the project. |
| payload.plan | [String](/docs/rest-api#introduction/api-basics/types) | The plan type of the deployment. |
| payload.regions | [List](/docs/rest-api#introduction/api-basics/types) | An array of the supported regions for the deployment. |

### [deployment.integration.action.cancel](#deployment.integration.action.cancel)

Occurs when an integration deployment action or the deployment itself is canceled.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.configuration.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the integration installation. |
| payload.installationId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the integration installation (same as `configuration.id`). |
| payload.resourceId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the integration resource for which the action is canceled. |
| payload.action | [String](/docs/rest-api#introduction/api-basics/types) | The action slug, declared by the integration |
| payload.deployment.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the deployment. |

### [deployment.integration.action.cleanup](#deployment.integration.action.cleanup)

Occurs when a deployment that executed an integration deployment action is cleaned up, such as due to the deployment retention policy.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.configuration.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the integration installation. |
| payload.installationId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the integration installation (same as `configuration.id`). |
| payload.resourceId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the integration resource for which the action is cleaned up. |
| payload.action | [String](/docs/rest-api#introduction/api-basics/types) | The action slug, declared by the integration |
| payload.deployment.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the deployment. |

### [deployment.integration.action.start](#deployment.integration.action.start)

Occurs when a deployment starts an integration deployment action.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.configuration.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the integration installation. |
| payload.installationId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the integration installation (same as `configuration.id`). |
| payload.resourceId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the integration resource for which the action is started. |
| payload.action | [String](/docs/rest-api#introduction/api-basics/types) | The action slug, declared by the integration |
| payload.deployment.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the deployment. |

### [deployment.promoted](#deployment.promoted)

Occurs whenever a deployment is promoted.

This event gets fired after a production deployment is [promoted](/docs/deployments/promoting-a-deployment#staging-and-promoting-a-production-deployment) to start serving production traffic. This can happen automatically after a successful build, or after running the [promote](/docs/cli/promote) command.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.team.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's team (possibly null). |
| payload.user.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's user. |
| payload.deployment.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the deployment. |
| payload.deployment.meta | [Map](/docs/rest-api#introduction/api-basics/types) | A Map of deployment metadata. |
| payload.deployment.url | [String](/docs/rest-api#introduction/api-basics/types) | The URL of the deployment. |
| payload.deployment.name | [String](/docs/rest-api#introduction/api-basics/types) | The project name used in the deployment URL. |
| payload.links.deployment | [String](/docs/rest-api#introduction/api-basics/types) | The URL on the Vercel Dashboard to inspect the deployment. |
| payload.links.project | [String](/docs/rest-api#introduction/api-basics/types) | The URL on the Vercel Dashboard to the project. |
| payload.project.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the project. |
| payload.plan | [String](/docs/rest-api#introduction/api-basics/types) | The plan type of the deployment. |
| payload.regions | [List](/docs/rest-api#introduction/api-basics/types) | An array of the supported regions for the deployment. |

### [deployment.ready](#deployment.ready)

Occurs whenever a deployment is successfully built and your integration has registered at least one [check](/docs/integrations/checks-overview).

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.team.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's team (possibly null). |
| payload.user.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's user. |
| payload.deployment.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the deployment. |
| payload.deployment.meta | [Map](/docs/rest-api#introduction/api-basics/types) | A Map of deployment metadata. |
| payload.deployment.url | [String](/docs/rest-api#introduction/api-basics/types) | The URL of the deployment. |
| payload.deployment.name | [String](/docs/rest-api#introduction/api-basics/types) | The project name used in the deployment URL. |
| payload.links.deployment | [String](/docs/rest-api#introduction/api-basics/types) | The URL on the Vercel Dashboard to inspect the deployment. |
| payload.links.project | [String](/docs/rest-api#introduction/api-basics/types) | The URL on the Vercel Dashboard to the project. |
| payload.target | [String](/docs/rest-api#introduction/api-basics/types) | A String that indicates the target. Possible values are `production`, `staging` or `null`. |
| payload.project.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the project. |
| payload.plan | [String](/docs/rest-api#introduction/api-basics/types) | The plan type of the deployment. |
| payload.regions | [List](/docs/rest-api#introduction/api-basics/types) | An array of the supported regions for the deployment. |

### [deployment.succeeded](#deployment.succeeded)

Occurs whenever a deployment is ready.

This event gets fired after all blocking Checks have passed. See [`deployment-prepared`](/docs/integrations#webhooks/events/deployment-prepared) if you registered Checks.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.team.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's team (possibly null). |
| payload.user.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's user. |
| payload.deployment.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the deployment. |
| payload.deployment.meta | [Map](/docs/rest-api#introduction/api-basics/types) | A Map of deployment metadata. |
| payload.deployment.url | [String](/docs/rest-api#introduction/api-basics/types) | The URL of the deployment. |
| payload.deployment.name | [String](/docs/rest-api#introduction/api-basics/types) | The project name used in the deployment URL. |
| payload.links.deployment | [String](/docs/rest-api#introduction/api-basics/types) | The URL on the Vercel Dashboard to inspect the deployment. |
| payload.links.project | [String](/docs/rest-api#introduction/api-basics/types) | The URL on the Vercel Dashboard to the project. |
| payload.target | [String](/docs/rest-api#introduction/api-basics/types) | A String that indicates the target. Possible values are `production`, `staging` or `null`. |
| payload.project.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the project. |
| payload.plan | [String](/docs/rest-api#introduction/api-basics/types) | The plan type of the deployment. |
| payload.regions | [List](/docs/rest-api#introduction/api-basics/types) | An array of the supported regions for the deployment. |

### [domain.created](#domain.created)

Occurs whenever a domain has been created.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.team.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's team (possibly null). |
| payload.user.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's user. |
| payload.domain.name | [String](/docs/rest-api#introduction/api-basics/types) | The Domain name created. |
| payload.domain.delegated | [Boolean](/docs/rest-api#introduction/api-basics/types) | Whether or not the domain was delegated/shared. |

### [domain.auto-renew-changed](#domain.auto-renew-changed)

Occurs whenever a domain's auto-renewal setting is changed.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.team.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's team (possibly null). |
| payload.user.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's user. |
| payload.domain.name | [String](/docs/rest-api#introduction/api-basics/types) | The name of the domain. |
| payload.previous | [Boolean](/docs/rest-api#introduction/api-basics/types) | The previous auto-renewal setting. |
| payload.next | [Boolean](/docs/rest-api#introduction/api-basics/types) | The new auto-renewal setting. |

### [domain.certificate-add](#domain.certificate-add)

Occurs whenever a new SSL certificate is added for a domain.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.team.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's team (possibly null). |
| payload.user.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's user. |
| payload.cert | [Object](/docs/rest-api#introduction/api-basics/types) | The certificate object containing certificate details. |

### [domain.certificate-add-failed](#domain.certificate-add-failed)

Occurs whenever adding a new SSL certificate for a domain fails.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.team.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's team (possibly null). |
| payload.user.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's user. |
| payload.dnsNames | [List](/docs/rest-api#introduction/api-basics/types) | An array of DNS names for which the certificate addition failed. |

### [domain.certificate-deleted](#domain.certificate-deleted)

Occurs whenever an SSL certificate is deleted for a domain.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.team.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's team (possibly null). |
| payload.user.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's user. |
| payload.cert | [Object](/docs/rest-api#introduction/api-basics/types) | The certificate object containing certificate details. |

### [domain.certificate-renew](#domain.certificate-renew)

Occurs whenever an SSL certificate is renewed for a domain.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.team.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's team (possibly null). |
| payload.user.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's user. |
| payload.cert | [Object](/docs/rest-api#introduction/api-basics/types) | The certificate object containing certificate details. |

### [domain.certificate-renew-failed](#domain.certificate-renew-failed)

Occurs whenever renewing an SSL certificate for a domain fails.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.team.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's team (possibly null). |
| payload.user.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's user. |
| payload.dnsNames | [List](/docs/rest-api#introduction/api-basics/types) | An array of DNS names for which the certificate renewal failed. |

### [domain.dns-records-changed](#domain.dns-records-changed)

Occurs whenever DNS records for a domain are modified.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.team.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's team (possibly null). |
| payload.user.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's user. |
| payload.zone | [String](/docs/rest-api#introduction/api-basics/types) | The DNS zone that was modified. |
| payload.changes | [List](/docs/rest-api#introduction/api-basics/types) | An array of changes made to the DNS records. |

### [domain.renewal](#domain.renewal)

Occurs whenever a domain is renewed.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.team.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's team (possibly null). |
| payload.user.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's user. |
| payload.domain.name | [String](/docs/rest-api#introduction/api-basics/types) | The name of the domain that was renewed. |
| payload.price | [String](/docs/rest-api#introduction/api-basics/types) | The renewal price as a decimal number. |
| payload.expirationDate | [Date](/docs/rest-api#introduction/api-basics/types) | The new expiration date of the domain. |
| payload.renewedAt | [Date](/docs/rest-api#introduction/api-basics/types) | The timestamp when the domain was renewed. |

### [domain.renewal-failed](#domain.renewal-failed)

Occurs whenever a domain renewal fails.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.team.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's team (possibly null). |
| payload.user.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's user. |
| payload.domain.name | [String](/docs/rest-api#introduction/api-basics/types) | The name of the domain for which renewal failed. |
| payload.errorReason | [String](/docs/rest-api#introduction/api-basics/types) | The reason why the renewal failed. |
| payload.failedAt | [Date](/docs/rest-api#introduction/api-basics/types) | The timestamp when the renewal failed. |

### [domain.transfer-in-completed](#domain.transfer-in-completed)

Occurs whenever a domain transfer into Vercel is completed.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.team.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's team (possibly null). |
| payload.user.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's user. |
| payload.domain.name | [String](/docs/rest-api#introduction/api-basics/types) | The name of the domain that was transferred. |

### [domain.transfer-in-failed](#domain.transfer-in-failed)

Occurs whenever a domain transfer into Vercel fails.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.team.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's team (possibly null). |
| payload.user.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's user. |
| payload.domain.name | [String](/docs/rest-api#introduction/api-basics/types) | The name of the domain for which the transfer failed. |

### [domain.transfer-in-started](#domain.transfer-in-started)

Occurs whenever a domain transfer into Vercel is initiated.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.team.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's team (possibly null). |
| payload.user.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's user. |
| payload.domain.name | [String](/docs/rest-api#introduction/api-basics/types) | The name of the domain for which the transfer was started. |

### [project.domain-created](#project.domain-created)

Occurs whenever a domain is added to a project.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.team.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's team (possibly null). |
| payload.user.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's user. |
| payload.project.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the project. |
| payload.domain.name | [String](/docs/rest-api#introduction/api-basics/types) | The name of the domain that was added to the project. |

### [project.domain-deleted](#project.domain-deleted)

Occurs whenever a domain is removed from a project.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.team.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's team (possibly null). |
| payload.user.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's user. |
| payload.project.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the project. |
| payload.domain.name | [String](/docs/rest-api#introduction/api-basics/types) | The name of the domain that was removed from the project. |

### [project.domain-moved](#project.domain-moved)

Occurs whenever a domain is moved from one project to another.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.team.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's team (possibly null). |
| payload.user.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's user. |
| payload.domain.name | [String](/docs/rest-api#introduction/api-basics/types) | The name of the domain that was moved. |
| payload.from.projectId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the project the domain was moved from. |
| payload.to.projectId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the project the domain was moved to. |
| payload.isRedirect | [Boolean](/docs/rest-api#introduction/api-basics/types) | Whether the move created a redirect. |

### [project.domain-unverified](#project.domain-unverified)

Occurs whenever a project domain becomes unverified.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.team.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's team (possibly null). |
| payload.user.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's user. |
| payload.project.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the project. |
| payload.domain.name | [String](/docs/rest-api#introduction/api-basics/types) | The name of the domain that became unverified. |

### [project.domain-updated](#project.domain-updated)

Occurs whenever a project domain is updated.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.team.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's team (possibly null). |
| payload.user.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's user. |
| payload.project.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the project. |
| payload.previous.domain | [String](/docs/rest-api#introduction/api-basics/types) | The previous domain name. |
| payload.previous.redirect | [String](/docs/rest-api#introduction/api-basics/types) | The previous redirect URL (possibly null). |
| payload.previous.redirectStatusCode | [Number](/docs/rest-api#introduction/api-basics/types) | The previous redirect status code (possibly null). |
| payload.previous.gitBranch | [String](/docs/rest-api#introduction/api-basics/types) | The previous git branch (possibly null). |
| payload.next.domain | [String](/docs/rest-api#introduction/api-basics/types) | The new domain name. |
| payload.next.redirect | [String](/docs/rest-api#introduction/api-basics/types) | The new redirect URL (possibly null). |
| payload.next.redirectStatusCode | [Number](/docs/rest-api#introduction/api-basics/types) | The new redirect status code (possibly null). |
| payload.next.gitBranch | [String](/docs/rest-api#introduction/api-basics/types) | The new git branch (possibly null). |

### [project.domain-verified](#project.domain-verified)

Occurs whenever a project domain is verified.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.team.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's team (possibly null). |
| payload.user.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's user. |
| payload.project.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the project. |
| payload.domain.name | [String](/docs/rest-api#introduction/api-basics/types) | The name of the domain that was verified. |

### [integration-configuration.permission-upgraded](#integration-configuration.permission-upgraded)

Occurs whenever the user changes the project permission for an integration.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.team.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's team (possibly null). |
| payload.user.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's user. |
| payload.configuration.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the configuration. |
| payload.configuration.projectSelection | [String](/docs/rest-api#introduction/api-basics/types) | A String representing the permission for projects. Possible values are `all` or `selected`. |
| payload.configuration.projects | [List](/docs/rest-api#introduction/api-basics/types) | An array of project IDs. |
| payload.projects.added | [List](/docs/rest-api#introduction/api-basics/types) | An array of added project IDs. |
| payload.projects.removed | [List](/docs/rest-api#introduction/api-basics/types) | An array of removed project IDs. |

### [integration-configuration.removed](#integration-configuration.removed)

Occurs whenever an integration has been removed.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.team.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's team (possibly null). |
| payload.user.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's user. |
| payload.configuration.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the configuration. |
| payload.configuration.projectSelection | [String](/docs/rest-api#introduction/api-basics/types) | A String representing the permission for projects. Possible values are `all` or `selected`. |
| payload.configuration.projects | [List](/docs/rest-api#introduction/api-basics/types) | An array of project IDs. |

### [integration-configuration.scope-change-confirmed](#integration-configuration.scope-change-confirmed)

Occurs whenever the user confirms pending scope changes.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.team.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's team (possibly null). |
| payload.user.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's user. |
| payload.configuration.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the configuration. |
| payload.configuration.scopes | [List](/docs/rest-api#introduction/api-basics/types) | List of all scopes (after confirmation). |

### [integration-resource.project-connected](#integration-resource.project-connected)

Occurs whenever the user connects the integration resource to a project.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.configuration.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the integration installation. |
| payload.installationId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the integration installation (same as `configuration.id`). |
| payload.resourceId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the resource. |
| payload.project.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the project. |
| payload.project.name | [String](/docs/rest-api#introduction/api-basics/types) | The name of the project. |
| payload.projectId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the project (same as project.id). |
| payload.targets | [List](/docs/rest-api#introduction/api-basics/types) | The list of the deployment targets. |

### [integration-resource.project-disconnected](#integration-resource.project-disconnected)

Occurs whenever the user disconnects the integration resource to a project.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.configuration.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the integration installation. |
| payload.installationId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the integration installation (same as `configuration.id`). |
| payload.resourceId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the resource. |
| payload.project.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the project. |
| payload.projectId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the project (same as project.id). |
| payload.targets | [List](/docs/rest-api#introduction/api-basics/types) | The list of the deployment targets. |

### [marketplace.invoice.created](#marketplace.invoice.created)

Occurs when an invoice was created and sent to the customer.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.configuration.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the integration installation. |
| payload.installationId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the integration installation (same as `configuration.id`). |
| payload.invoiceId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the Marketplace invoice. |
| payload.externalInvoiceId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the Marketplace invoice, provided by integrator. Possibly `null`. |
| payload.period.start | [IsoDate](/docs/rest-api#introduction/api-basics/types) | The invoice's period start date. |
| payload.period.end | [IsoDate](/docs/rest-api#introduction/api-basics/types) | The invoice's period end date. |
| payload.invoiceDate | [IsoDate](/docs/rest-api#introduction/api-basics/types) | The invoice's date. |
| payload.invoiceTotal | [String](/docs/rest-api#introduction/api-basics/types) | The invoice's total as a decimal number. |

### [marketplace.invoice.notpaid](#marketplace.invoice.notpaid)

Occurs when an invoice was not paid after a grace period.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.configuration.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the integration installation. |
| payload.installationId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the integration installation (same as `configuration.id`). |
| payload.invoiceId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the Marketplace invoice. |
| payload.externalInvoiceId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the Marketplace invoice, provided by integrator. Possibly `null`. |
| payload.period.start | [IsoDate](/docs/rest-api#introduction/api-basics/types) | The invoice's period start date. |
| payload.period.end | [IsoDate](/docs/rest-api#introduction/api-basics/types) | The invoice's period end date. |
| payload.invoiceDate | [IsoDate](/docs/rest-api#introduction/api-basics/types) | The invoice's date. |
| payload.invoiceTotal | [String](/docs/rest-api#introduction/api-basics/types) | The invoice's total as a decimal number. |

### [marketplace.invoice.paid](#marketplace.invoice.paid)

Occurs when an invoice was paid.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.configuration.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the integration installation. |
| payload.installationId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the integration installation (same as `configuration.id`). |
| payload.invoiceId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the Marketplace invoice. |
| payload.externalInvoiceId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the Marketplace invoice, provided by integrator. Possibly `null`. |
| payload.period.start | [IsoDate](/docs/rest-api#introduction/api-basics/types) | The invoice's period start date. |
| payload.period.end | [IsoDate](/docs/rest-api#introduction/api-basics/types) | The invoice's period end date. |
| payload.invoiceDate | [IsoDate](/docs/rest-api#introduction/api-basics/types) | The invoice's date. |
| payload.invoiceTotal | [String](/docs/rest-api#introduction/api-basics/types) | The invoice's total as a decimal number. |

### [marketplace.invoice.refunded](#marketplace.invoice.refunded)

Occurs when an invoice is refunded.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.configuration.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the integration installation. |
| payload.installationId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the integration installation (same as `configuration.id`). |
| payload.invoiceId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the Marketplace invoice. |
| payload.externalInvoiceId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the Marketplace invoice, provided by integrator. Possibly `null`. |
| payload.period.start | [IsoDate](/docs/rest-api#introduction/api-basics/types) | The invoice's period start date. |
| payload.period.end | [IsoDate](/docs/rest-api#introduction/api-basics/types) | The invoice's period end date. |
| payload.amount | [String](/docs/rest-api#introduction/api-basics/types) | The amount being refunded as a decimal number. |
| payload.reason | [String](/docs/rest-api#introduction/api-basics/types) | The reason for why the refund has been issued. |

### [project.created](#project.created)

Occurs whenever a project has been created.

This event is sent only when the Integration has access to all projects in a Vercel scope.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.team.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's team (possibly null). |
| payload.user.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's user. |
| payload.project.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the project. |
| payload.project.name | [String](/docs/rest-api#introduction/api-basics/types) | Name of the project. |

### [project.removed](#project.removed)

Occurs whenever a project has been removed.

This event is sent only when the integration has access to all projects in a Vercel scope.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.team.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's team (possibly null). |
| payload.user.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's user. |
| payload.project.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the project. |
| payload.project.name | [String](/docs/rest-api#introduction/api-basics/types) | Name of the project. |

### [project.rolling-release.approved](#project.rolling-release.approved)

Occurs whenever a rolling release stage is approved and progresses to the next stage.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.team.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's team (possibly null). |
| payload.user.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's user. |
| payload.project.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the project. |
| payload.project.name | [String](/docs/rest-api#introduction/api-basics/types) | Name of the project. |
| payload.rollingRelease | [Object](/docs/rest-api#introduction/api-basics/types) | The current rolling release configuration. |
| payload.rollingRelease.projectId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the project. |
| payload.rollingRelease.ownerId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the team or user that owns the rolling release. |
| payload.rollingRelease.deploymentIds | [List](/docs/rest-api#introduction/api-basics/types) | Array of deployment IDs involved in the rolling release. |
| payload.rollingRelease.state | [String](/docs/rest-api#introduction/api-basics/types) | The current state of the rolling release. Possible values are `ACTIVE`, `COMPLETE`, `ABORTED`. |
| payload.rollingRelease.activeStageIndex | [Number](/docs/rest-api#introduction/api-basics/types) | The index of the currently active stage. |
| payload.rollingRelease.default | [Object](/docs/rest-api#introduction/api-basics/types) | The default deployment configuration. |
| payload.rollingRelease.default.baseDeploymentId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the base deployment. |
| payload.rollingRelease.default.targetDeploymentId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the target deployment. |
| payload.rollingRelease.default.targetPercentage | [Number](/docs/rest-api#introduction/api-basics/types) | The target percentage of traffic to route to the target deployment. |
| payload.rollingRelease.default.targetStartAt | [Number](/docs/rest-api#introduction/api-basics/types) | The timestamp when the target deployment started. |
| payload.rollingRelease.default.targetUpdatedAt | [Number](/docs/rest-api#introduction/api-basics/types) | The timestamp when the target deployment was last updated. |
| payload.rollingRelease.config | [Object](/docs/rest-api#introduction/api-basics/types) | The rolling release configuration. |
| payload.rollingRelease.config.target | [String](/docs/rest-api#introduction/api-basics/types) | The target environment for the rolling release. |
| payload.rollingRelease.config.stages | [List](/docs/rest-api#introduction/api-basics/types) | Array of stage configurations. |
| payload.rollingRelease.writtenBy | [String](/docs/rest-api#introduction/api-basics/types) | The source that triggered the rolling release update. |
| payload.prevRollingRelease | [Object](/docs/rest-api#introduction/api-basics/types) | The previous rolling release configuration before the approval. |

### [project.rolling-release.completed](#project.rolling-release.completed)

Occurs whenever a rolling release is completed successfully.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.team.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's team (possibly null). |
| payload.user.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's user. |
| payload.project.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the project. |
| payload.project.name | [String](/docs/rest-api#introduction/api-basics/types) | Name of the project. |
| payload.rollingRelease | [Object](/docs/rest-api#introduction/api-basics/types) | The completed rolling release configuration. |
| payload.rollingRelease.projectId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the project. |
| payload.rollingRelease.ownerId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the team or user that owns the rolling release. |
| payload.rollingRelease.deploymentIds | [List](/docs/rest-api#introduction/api-basics/types) | Array of deployment IDs involved in the rolling release. |
| payload.rollingRelease.state | [String](/docs/rest-api#introduction/api-basics/types) | The state of the rolling release (will be `COMPLETE`). |
| payload.rollingRelease.activeStageIndex | [Number](/docs/rest-api#introduction/api-basics/types) | The index of the final stage. |
| payload.rollingRelease.default | [Object](/docs/rest-api#introduction/api-basics/types) | The final deployment configuration. |
| payload.rollingRelease.default.baseDeploymentId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the base deployment. |
| payload.rollingRelease.default.targetDeploymentId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the target deployment. |
| payload.rollingRelease.default.targetPercentage | [Number](/docs/rest-api#introduction/api-basics/types) | The final target percentage (will be 100). |
| payload.rollingRelease.default.targetStartAt | [Number](/docs/rest-api#introduction/api-basics/types) | The timestamp when the target deployment started. |
| payload.rollingRelease.default.targetUpdatedAt | [Number](/docs/rest-api#introduction/api-basics/types) | The timestamp when the target deployment was last updated. |
| payload.rollingRelease.config | [Object](/docs/rest-api#introduction/api-basics/types) | The rolling release configuration. |
| payload.rollingRelease.config.target | [String](/docs/rest-api#introduction/api-basics/types) | The target environment for the rolling release. |
| payload.rollingRelease.config.stages | [List](/docs/rest-api#introduction/api-basics/types) | Array of stage configurations. |
| payload.rollingRelease.writtenBy | [String](/docs/rest-api#introduction/api-basics/types) | The source that completed the rolling release. |
| payload.prevRollingRelease | [Object](/docs/rest-api#introduction/api-basics/types) | The previous rolling release configuration before completion. |

### [project.rolling-release.aborted](#project.rolling-release.aborted)

Occurs whenever a rolling release is aborted.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.team.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's team (possibly null). |
| payload.user.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's user. |
| payload.project.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the project. |
| payload.project.name | [String](/docs/rest-api#introduction/api-basics/types) | Name of the project. |
| payload.rollingRelease | [Object](/docs/rest-api#introduction/api-basics/types) | The aborted rolling release configuration. |
| payload.rollingRelease.projectId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the project. |
| payload.rollingRelease.ownerId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the team or user that owns the rolling release. |
| payload.rollingRelease.deploymentIds | [List](/docs/rest-api#introduction/api-basics/types) | Array of deployment IDs involved in the rolling release. |
| payload.rollingRelease.state | [String](/docs/rest-api#introduction/api-basics/types) | The state of the rolling release (will be `ABORTED`). |
| payload.rollingRelease.activeStageIndex | [Number](/docs/rest-api#introduction/api-basics/types) | The index of the stage when aborted. |
| payload.rollingRelease.default | [Object](/docs/rest-api#introduction/api-basics/types) | The deployment configuration at the time of abortion. |
| payload.rollingRelease.default.baseDeploymentId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the base deployment. |
| payload.rollingRelease.default.targetDeploymentId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the target deployment. |
| payload.rollingRelease.default.targetStartAt | [Number](/docs/rest-api#introduction/api-basics/types) | The timestamp when the target deployment started. |
| payload.rollingRelease.default.targetUpdatedAt | [Number](/docs/rest-api#introduction/api-basics/types) | The timestamp when the rolling release was aborted. |
| payload.rollingRelease.config | [Object](/docs/rest-api#introduction/api-basics/types) | The rolling release configuration. |
| payload.rollingRelease.config.target | [String](/docs/rest-api#introduction/api-basics/types) | The target environment for the rolling release. |
| payload.rollingRelease.config.stages | [List](/docs/rest-api#introduction/api-basics/types) | Array of stage configurations. |
| payload.rollingRelease.writtenBy | [String](/docs/rest-api#introduction/api-basics/types) | The source that aborted the rolling release. |
| payload.prevRollingRelease | [Object](/docs/rest-api#introduction/api-basics/types) | The previous rolling release configuration before abortion. |

### [project.rolling-release.started](#project.rolling-release.started)

Occurs whenever a rolling release is started.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.team.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's team (possibly null). |
| payload.user.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's user. |
| payload.project.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the project. |
| payload.project.name | [String](/docs/rest-api#introduction/api-basics/types) | Name of the project. |
| payload.rollingRelease | [Object](/docs/rest-api#introduction/api-basics/types) | The started rolling release configuration. |
| payload.rollingRelease.projectId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the project. |
| payload.rollingRelease.ownerId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the team or user that owns the rolling release. |
| payload.rollingRelease.deploymentIds | [List](/docs/rest-api#introduction/api-basics/types) | Array of deployment IDs involved in the rolling release. |
| payload.rollingRelease.state | [String](/docs/rest-api#introduction/api-basics/types) | The state of the rolling release (will be `ACTIVE`). |
| payload.rollingRelease.activeStageIndex | [Number](/docs/rest-api#introduction/api-basics/types) | The index of the initial stage (usually 0). |
| payload.rollingRelease.default | [Object](/docs/rest-api#introduction/api-basics/types) | The initial deployment configuration. |
| payload.rollingRelease.default.baseDeploymentId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the base deployment. |
| payload.rollingRelease.default.targetDeploymentId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the target deployment. |
| payload.rollingRelease.default.targetPercentage | [Number](/docs/rest-api#introduction/api-basics/types) | The initial target percentage for the first stage. |
| payload.rollingRelease.default.targetStartAt | [Number](/docs/rest-api#introduction/api-basics/types) | The timestamp when the rolling release started. |
| payload.rollingRelease.default.targetUpdatedAt | [Number](/docs/rest-api#introduction/api-basics/types) | The timestamp when the rolling release was last updated. |
| payload.rollingRelease.config | [Object](/docs/rest-api#introduction/api-basics/types) | The rolling release configuration. |
| payload.rollingRelease.config.target | [String](/docs/rest-api#introduction/api-basics/types) | The target environment for the rolling release. |
| payload.rollingRelease.config.stages | [List](/docs/rest-api#introduction/api-basics/types) | Array of stage configurations. |
| payload.rollingRelease.writtenBy | [String](/docs/rest-api#introduction/api-basics/types) | The source that started the rolling release. |
| payload.prevRollingRelease | [Object](/docs/rest-api#introduction/api-basics/types) | The previous rolling release configuration (if any) before starting the new one. |

## [Legacy Payload](#legacy-payload)

The legacy webhook payload is a JSON object with the following keys.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| type | [String](/docs/rest-api#introduction/api-basics/types) | The [legacy event type](#introduction/legacy-event-types). |
| id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the webhook delivery. |
| createdAt | [Number](/docs/rest-api#introduction/api-basics/types) | The webhook delivery timestamp. |
| region | [String](/docs/rest-api#introduction/api-basics/types) | The region the event occurred in (possibly null). |
| clientId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of integration's client. |
| ownerId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event owner (user or team). |
| teamId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's team (possibly null). |
| userId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the event's users. |
| webhookId | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the webhook. |
| payload | [Object](/docs/rest-api#introduction/api-basics/types) | The payload of the webhook. See [Legacy Event Types](#introduction/legacy-event-types) for more information. |

## [Legacy Event Types](#legacy-event-types)

The following event types have been deprecated and webhooks that listen for them can no longer be created. Vercel will continue to deliver the deprecated events to existing webhooks.

### [deployment](#deployment)

This event is replaced by [deployment.created](#deployment.created).

Occurs whenever a deployment is created.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.alias | [List](/docs/rest-api#introduction/api-basics/types) | An array of aliases that will get assigned when the deployment is ready. |
| payload.deployment.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the deployment. |
| payload.deployment.meta | [Map](/docs/rest-api#introduction/api-basics/types) | A Map of deployment metadata. |
| payload.deployment.url | [String](/docs/rest-api#introduction/api-basics/types) | The URL of the deployment. |
| payload.deployment.name | [String](/docs/rest-api#introduction/api-basics/types) | The project name used in the deployment URL. |
| payload.links.deployment | [String](/docs/rest-api#introduction/api-basics/types) | The URL on the Vercel Dashboard to inspect the deployment. |
| payload.links.project | [String](/docs/rest-api#introduction/api-basics/types) | The URL on the Vercel Dashboard to the project. |
| payload.target | [String](/docs/rest-api#introduction/api-basics/types) | A String that indicates the target. Possible values are `production`, `staging` or `null`. |
| payload.projectId | [String](/docs/rest-api#introduction/api-basics/types) | The ID of the project. |
| payload.plan | [String](/docs/rest-api#introduction/api-basics/types) | The plan type of the deployment. |
| payload.regions | [List](/docs/rest-api#introduction/api-basics/types) | An array of the supported regions for the deployment. |

### [deployment-ready](#deployment-ready)

This event is replaced by [deployment.succeeded](#deployment.succeeded).

Occurs whenever a deployment is ready.

This event gets fired after all blocking checks have passed. See [`deployment-prepared`](/docs/integrations#webhooks/events-types/deployment-prepared) if you registered Checks.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.deployment.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the deployment. |
| payload.deployment.meta | [Map](/docs/rest-api#introduction/api-basics/types) | A Map of deployment metadata. |
| payload.deployment.url | [String](/docs/rest-api#introduction/api-basics/types) | The URL of the deployment. |
| payload.deployment.name | [String](/docs/rest-api#introduction/api-basics/types) | The project name used in the deployment URL. |
| payload.links.deployment | [String](/docs/rest-api#introduction/api-basics/types) | The URL on the Vercel Dashboard to inspect the deployment. |
| payload.links.project | [String](/docs/rest-api#introduction/api-basics/types) | The URL on the Vercel Dashboard to the project. |
| payload.target | [String](/docs/rest-api#introduction/api-basics/types) | A String that indicates the target. Possible values are `production`, `staging` or `null`. |
| payload.projectId | [String](/docs/rest-api#introduction/api-basics/types) | The ID of the project. |
| payload.plan | [String](/docs/rest-api#introduction/api-basics/types) | The plan type of the deployment. |
| payload.regions | [List](/docs/rest-api#introduction/api-basics/types) | An array of the supported regions for the deployment. |

### [deployment-prepared](#deployment-prepared)

This event is replaced by [deployment.ready](#deployment.ready).

Occurs whenever a deployment is successfully built and your integration has registered at least one [check](/docs/integrations/checks-overview).

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.deployment.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the deployment. |
| payload.deployment.meta | [Map](/docs/rest-api#introduction/api-basics/types) | A Map of deployment metadata. |
| payload.deployment.url | [String](/docs/rest-api#introduction/api-basics/types) | The URL of the deployment. |
| payload.deployment.name | [String](/docs/rest-api#introduction/api-basics/types) | The project name used in the deployment URL. |
| payload.links.deployment | [String](/docs/rest-api#introduction/api-basics/types) | The URL on the Vercel Dashboard to inspect the deployment. |
| payload.links.project | [String](/docs/rest-api#introduction/api-basics/types) | The URL on the Vercel Dashboard to the project. |
| payload.target | [String](/docs/rest-api#introduction/api-basics/types) | A String that indicates the target. Possible values are `production`, `staging` or `null`. |
| payload.projectId | [String](/docs/rest-api#introduction/api-basics/types) | The ID of the project. |
| payload.plan | [String](/docs/rest-api#introduction/api-basics/types) | The plan type of the deployment. |
| payload.regions | [List](/docs/rest-api#introduction/api-basics/types) | An array of the supported regions for the deployment. |

### [deployment-canceled](#deployment-canceled)

This event is replaced by [deployment.canceled](#deployment.canceled).

Occurs whenever a deployment is canceled.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.deployment.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the deployment. |
| payload.deployment.meta | [Map](/docs/rest-api#introduction/api-basics/types) | A Map of deployment metadata. |
| payload.deployment.url | [String](/docs/rest-api#introduction/api-basics/types) | The URL of the deployment. |
| payload.deployment.name | [String](/docs/rest-api#introduction/api-basics/types) | The project name used in the deployment URL. |
| payload.links.deployment | [String](/docs/rest-api#introduction/api-basics/types) | The URL on the Vercel Dashboard to inspect the deployment. |
| payload.links.project | [String](/docs/rest-api#introduction/api-basics/types) | The URL on the Vercel Dashboard to the project. |
| payload.target | [String](/docs/rest-api#introduction/api-basics/types) | A String that indicates the target. Possible values are `production`, `staging` or `null`. |
| payload.projectId | [String](/docs/rest-api#introduction/api-basics/types) | The ID of the project. |
| payload.plan | [String](/docs/rest-api#introduction/api-basics/types) | The plan type of the deployment. |
| payload.regions | [List](/docs/rest-api#introduction/api-basics/types) | An array of the supported regions for the deployment. |

### [deployment-error](#deployment-error)

This event is replaced by [deployment.error](#deployment.error).

Occurs whenever a deployment has failed.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.deployment.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the deployment. |
| payload.deployment.meta | [Map](/docs/rest-api#introduction/api-basics/types) | A Map of deployment metadata. |
| payload.deployment.url | [String](/docs/rest-api#introduction/api-basics/types) | The URL of the deployment. |
| payload.deployment.name | [String](/docs/rest-api#introduction/api-basics/types) | The project name used in the deployment URL. |
| payload.links.deployment | [String](/docs/rest-api#introduction/api-basics/types) | The URL on the Vercel Dashboard to inspect the deployment. |
| payload.links.project | [String](/docs/rest-api#introduction/api-basics/types) | The URL on the Vercel Dashboard to the project. |
| payload.target | [String](/docs/rest-api#introduction/api-basics/types) | A String that indicates the target. Possible values are `production`, `staging` or `null`. |
| payload.projectId | [String](/docs/rest-api#introduction/api-basics/types) | The ID of the project. |
| payload.plan | [String](/docs/rest-api#introduction/api-basics/types) | The plan type of the deployment. |
| payload.regions | [List](/docs/rest-api#introduction/api-basics/types) | An array of the supported regions for the deployment. |

### [deployment-check-rerequested](#deployment-check-rerequested)

This event is replaced by [deployment.check-rerequested](#deployment.check-rerequested).

Occurs when a user has requested for a [check](/docs/integrations/checks-overview) to be rerun after it failed.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.deployment.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the deployment. |
| payload.check.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the check. |

### [deployment-checks-completed](#deployment-checks-completed)

This event has been removed. [deployment.succeeded](#deployment.succeeded) can be used for the same purpose.

Occurs when all checks for a deployment have completed. This does not indicate that they have all passed, only that they are no longer running. It is possible for webhook to occur multiple times for a single deployment if any checks are [re-requested](/docs/observability/checks-overview/creating-checks#rerunning-checks).

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.deployment.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the deployment. |
| payload.checks | [List](/docs/rest-api#introduction/api-basics/types) | Information about the Checks. |

Each item in `checks` has the following properties:

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.id | [ID](/docs/rest-api#introduction/api-basics/types) | The unique identifier of the check. Always prepended with `check_`. |
| payload.name | [String](/docs/rest-api#introduction/api-basics/types) | The name of the check. |
| payload.status | [String](/docs/rest-api#introduction/api-basics/types) | The status of the check. One of `registered`, `running` or `completed` |
| payload.conclusion | [String](/docs/rest-api#introduction/api-basics/types) | The conclusion of the check. One of `cancelled`, `failed`, `neutral`, `succeeded` or `skipped`. |
| payload.blocking | [Boolean](/docs/rest-api#introduction/api-basics/types) | Whether a deployment should be blocked or not. |
| payload.integrationId | [String](/docs/rest-api#introduction/api-basics/types) | The unique identifier of the integration. |

### [project-created](#project-created)

This event is replaced by [project.created](#project.created).

Occurs whenever a project has been created.

This event is sent only when the Integration has access to all projects in a Vercel scope.

  

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.project.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the project. |
| payload.project.name | [String](/docs/rest-api#introduction/api-basics/types) | Name of the project. |

### [project-removed](#project-removed)

This event is replaced by [project.removed](#project.removed).

Occurs whenever a Project has been removed.

This event is sent only when the Integration has access to all Projects in a Vercel scope.

  

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.project.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the project. |
| payload.project.name | [String](/docs/rest-api#introduction/api-basics/types) | Name of the project. |

### [integration-configuration-removed](#integration-configuration-removed)

This event is replaced by [integration-configuration.removed](#integration-configuration.removed).

Occurs whenever an integration has been removed.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.configuration.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the configuration. |
| payload.configuration.projects | [List](/docs/rest-api#introduction/api-basics/types) | An array of project IDs. |

### [integration-configuration-permission-updated](#integration-configuration-permission-updated)

This event is replaced by [integration-configuration.permission-upgraded](#integration-configuration.permission-upgraded) .

Occurs whenever the user changes the project permission for an integration.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.configuration.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the configuration. |
| payload.configuration.projectSelection | [String](/docs/rest-api#introduction/api-basics/types) | A String representing the permission for projects. Possible values are `all` or `selected`. |
| payload.configuration.projects | [List](/docs/rest-api#introduction/api-basics/types) | An array of project IDs. |
| payload.projects.added | [List](/docs/rest-api#introduction/api-basics/types) | An array of added project IDs. |
| payload.projects.removed | [List](/docs/rest-api#introduction/api-basics/types) | An array of removed project IDs. |

### [integration-configuration-scope-change-confirmed](#integration-configuration-scope-change-confirmed)

This event is replaced by [integration-configuration.scope-change-confirmed](#integration-configuration.scope-change-confirmed) .

Occurs whenever the user confirms pending scope changes.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.configuration.id | [ID](/docs/rest-api#introduction/api-basics/types) | The ID of the configuration. |
| payload.configuration.scopes | [List](/docs/rest-api#introduction/api-basics/types) | List of all scopes (after confirmation). |

### [domain-created](#domain-created)

This event is replaced by [domain.created](#domain.created).

Occurs whenever a domain has been created.

| Key | [Type](/docs/rest-api#introduction/api-basics/types) | Description |
| --- | --- | --- |
| payload.domain.name | [String](/docs/rest-api#introduction/api-basics/types) | The Domain name created. |
| payload.domain.delegated | [String](/docs/rest-api#introduction/api-basics/types) | Whether or not the domain was delegated/shared. |

## [Securing webhooks](#securing-webhooks)

Once your server is configured to receive payloads, it will listen for any payload sent to the endpoint you configured. By knowing the URL of your webhook, anybody can send you requests. Therefore, it is recommended to check whether the requests are coming from Vercel or not.

The recommended method to check is to use the [`x-vercel-signature`](/docs/headers#x-vercel-signature) security header you receive with each request. The value of this header corresponds to the `sha1` of the request body using your [client secret](/docs/webhooks#enter-your-endpoint-url).

For example, you can validate a webhook request as follows:

Next.js (/app)Next.js (/pages)Other frameworks

```
import crypto from 'crypto';
 
export async function GET(request: Request) {
  const { INTEGRATION_SECRET } = process.env;
 
  if (typeof INTEGRATION_SECRET != 'string') {
    throw new Error('No integration secret found');
  }
 
  const rawBody = await request.text();
  const rawBodyBuffer = Buffer.from(rawBody, 'utf-8');
  const bodySignature = sha1(rawBodyBuffer, INTEGRATION_SECRET);
 
  if (bodySignature !== request.headers.get('x-vercel-signature')) {
    return Response.json({
      code: 'invalid_signature',
      error: "signature didn't match",
    });
  }
 
  const json = JSON.parse(rawBodyBuffer.toString('utf-8'));
 
  switch (json.type) {
    case 'project.created':
    // ...
  }
 
  return new Response('Webhook request validated', {
    status: 200,
  });
}
 
function sha1(data: Buffer, secret: string): string {
  return crypto.createHmac('sha1', secret).update(data).digest('hex');
}
```

Example on how to validate a webhook message.

You can compute the signature using an HMAC hexdigest from the secret token of OAuth2 and request body, then compare it with the value of the [`x-vercel-signature`](/docs/headers#x-vercel-signature) header to validate the payload.

## [HTTP Response](#http-response)

You should consider this HTTP request to be an event. Once you receive the request, you should schedule a task for your action.

This request has a timeout of 30 seconds. That means if a `2XX` HTTP response is not received within 30 seconds, the request will be aborted.

## [Delivery Attempts and Retries](#delivery-attempts-and-retries)

If your HTTP endpoint does not respond with a `2XX` HTTP status code, we attempt to deliver the webhook event up to 24 hours with an exponential backoff. Events that could not be delivered within 24 hours will not be retried and will be discarded.

Last updated on June 27, 2025