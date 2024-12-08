# maintenance-page

A simple maintenance page that shows the estimated time remaining for a maintenance event.

## Overview

This page is served from an Astro application. The time estimate is provided by a Redis database.

```mermaid
flowchart TD
    subgraph "Normal Operation"
        MAIN[Main Application]
        MAINT[maintenance.example.com] -->|302 redirect to main site| MAIN
    end

    subgraph "During Maintenance"
        MAIN2[Main Application] -->|302 redirect to maintenance site| MAINT2[maintenance.example.com]
        MAINT2 -->|Shows| MP[Maintenance Page]
        db[(Redis)] -->|Provides time estimate| MP
        STATUS[examplestatus.com] -->|Provides status updates| MP
    end

    %% Styling
    classDef normal fill:#d1fae5,stroke:#333
    classDef maintenance fill:#fee2e2,stroke:#333
    classDef neutral fill:#f3f4f6,stroke:#333

    class MAIN,MAIN2 normal
    class MP,db maintenance
    class MAINT,MAINT2,STATUS neutral
```

### Use cases

You can use this page to inform users that the site is undergoing maintenance.

## Installation

### Requirements

- A Redis database
- [Vercel](https://vercel.com) for deployment (or another site host)

### Environment Variables

See [.env.example](.env.example).

## Usage

### Maintenance Configuration Hash Fields

| Field       | Type              | Format            | Description                                                                                         |
| ----------- | ----------------- | ----------------- | --------------------------------------------------------------------------------------------------- |
| endTime     | string (optional) | ISO 8601          | The time when maintenance is scheduled to end.                                                      |
| enabled     | string            | "true" or "false" | Whether maintenance mode is currently active. If false, traffic is redirected to the `redirectUrl`. |
| redirectUrl | string            | URL               | The destination URL for redirecting traffic during maintenance.                                     |

### Enabling maintenance mode

```mermaid
flowchart TD
    direction TB

    subgraph step1["1: Remove Current Redirect"]
        direction TB
        MAINT1[maintenance.example.com] -.-x MAIN1[example.com]
    end

    subgraph step2["2: Configure New Redirect"]
        direction TB
        MAIN2[example.com] -->|Redirects to| MAINT2[maintenance.example.com]
    end

    %% Flow between steps
    step1 --> step2

    %% Styling
    classDef normal fill:#d1fae5,stroke:#333
    classDef maintenance fill:#fee2e2,stroke:#333
    classDef neutral fill:#f3f4f6,stroke:#333

    class MAIN1,MAIN2 normal
    class step1,step2 maintenance
    class MAINT1,MAINT2 neutral
```

### Disabling maintenance mode

```mermaid
flowchart TD
    direction TB

    subgraph step1["1: Remove Current Redirect"]
        direction TB
        MAIN1[example.com] -.-x MAINT1[maintenance.example.com]
    end

    subgraph step2["2: Restore Original Redirect"]
        direction TB
        MAINT2[maintenance.example.com] -->|Redirects to| MAIN2[example.com]
    end

    %% Flow between steps
    step1 --> step2

    %% Styling
    classDef normal fill:#d1fae5,stroke:#333
    classDef maintenance fill:#fee2e2,stroke:#333
    classDef neutral fill:#f3f4f6,stroke:#333

    class MAIN1,MAIN2 normal
    class step1,step2 maintenance
    class MAINT1,MAINT2 neutral
```

## Deployment

See [.envrc.example](.envrc.example) for the environment variables you need to set.

```bash
# Pull the environment information.
VERCEL_PROJECT_ID=$VERCEL_MAINTENANCE_PAGE_PROJECT_ID vercel pull --yes --environment=production --scope=gnometeaparty --token=$VERCEL_TOKEN

# Copy the Vercel environment variables.
cp .vercel/.env.production.local .env.production.local

# Build the project artifacts.
vercel build --prod

# Deploy the project artifacts to Vercel.
VERCEL_PROJECT_ID=$VERCEL_MAINTENANCE_PAGE_PROJECT_ID vercel deploy --prebuilt --prod --token=$VERCEL_TOKEN
```

### Revalidation

The maintenance page is currently configured to revalidate every 2 minutes using Vercel's ISR feature.

If desired, you can add the `bypassToken` field to the [astro.config.mjs](astro.config.mjs) Vercel ISR options for on-demand ISR.

## Additional Information

For any issues or feature requests, please open an issue on the repository.
