Configuration steps:


Step1:
Create personal github access token for your repo.
Follow instructions at https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token
Select admin:repo_hook checkbox


Navigate to your GitHub repository and select Settings.
Select Add webhook under Webhooks.
Enter webhook url (point to your hosted url)
Select "All" events.



Step2: 
create file .env with the following content:

GITHUB_REPO=repo name
GITHUB_OWNER=owner user of the repo
GITHUB_TOKEN=token created at step1




Event flow description

Upon an action on the selected github repo, github automatically generates an event and sends it to the configured
Webhook endpoint via HTTP as a json object. The endpoint receives the event , parses the json object and forwards the 
event to PPLDo service via GraphQL.
