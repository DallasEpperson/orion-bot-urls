# URL plugin for Orion

Plugin for [Orion](https://github.com/DallasEpperson/orion-bot). Adds the ability to query Orion against a local repository of URLs.

## Installing

* Copy this repo into a subfolder of Orion's `plugins/` folder
* Create a `urls.config.json` file in this subfolder
* Reboot Orion

## Usage

Responds to any message like `Tell me the URL for *` or `What's the * URL`.  

## URL repository

The collection of URLs is stored in urls.config.json like so.  

```javascript
[
    {
        "url": "https://www.example.com/Login",
        "name": "Example Production Website",
        "tags": [
            "production example",
            "example production"
        ]
    },
    {
        "url": "https://somethingelse.com",
        "name": "Derp Website",
        "tags": [
            "derpsite",
            "derp site",
            "production derp site"
        ]
    }
]
```