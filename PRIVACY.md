Open in Linear collects only the minimal data required for operation. The collected data is never transmitted to or available to the Open in Linear developer, and is only transmitted to Linear as required for operation.

The extension will send requests to `https://api.linear.app/graphql` containing the user-provided Linear API key, and the GitHub issue URL, to retrieve the Linear ticket URL. Otherwise, no data is transmitted.

In detail, the extension will process:
- The Linear API key you paste into the extension settings
  - This is required to access the Linear API to search for the corresponding Linear issue
  - This is stored locally in the browser's extension storage
  - This is transmitted to the Linear API in order to do the search
- The URLs of GitHub issues you use the extension on
  - This is required in order to search for the corresponding Linear issue
  - This is not stored
  - This is transmitted to the Linear API in order to do the search
- The search results for corresponding Linear issues returned by the Linear API
  - This is used to open the Linear ticket in your browser
  - This is not stored
  - This is never transmitted anywhere

None of this information every leaves your computer, and it is **not accessible to the Open in Linear developer** in any form. It cannot be shared, sold, or transferred to any third parties.
