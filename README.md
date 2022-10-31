# simplestocks
Working with IEX and Quandl to create a financial information page

## To-Do
- flesh out each view's contents
- adjust chart props so that it shows chart timeline
- create a chart table to cache chart data when it's been called
- tooltips for each bs/is component containing the indicator description
  - incorporate react-tooltips for tooltips and react-table to replace layout
- create 'big' and 'small' views for each statement
- ~~update the financials table to contain data from last 5 years~~
- ~~write a script to iterate through ticker table, pull all financials for each ticker, and upload them to the financials table~~

## Introduction
I'm building my own financial analysis website. Currently it only works with NYSE/NASDAQ listed stocks, but eventually I'd like to expand it to deal with all kinds of financial instruments.

If you have a brokerage account and look at the 'research' page for that account, you might find something like this site.

# Features:

## Search-by-Ticker & Data Validation
The search bar used to add things to your watchlist has a dropdown autocomplete functionality implemented using a Trie (prefix tree) data structure. A GET route is sent to the Express server which then executes a SQL query for all tickers in the database that are currently listed. The server then loads these tickers into a Trie and sends it back to the client, where it gets loaded into state using Zustand.

The search bar has an event handler, where when the input changes, a getAllWordsStartingWith function is run using the current input as the 'starting with' argument. The resulting array is then loaded into state to be used as the dropdown menu. Selecting a ticker from the dropdown menu replaces the search bar value with the selected ticker.

![Dropdown populates with possible valid inputs based on input so far](https://user-images.githubusercontent.com/41023883/198709284-60feabbd-8f5f-4121-a11a-8d134811aec8.png)

If the search bar input is not a valid ticker, the submit button cannot be pressed and it cannot be added to a watch list. Valid tickers come from Quandl's Sharadar dataset.

## Charts
Once stocks are added to the user's watchlist, they appear in the user's home page. Charts are generated using ApexCharts, data is sourced from iexCloud.

![Chart examples](https://user-images.githubusercontent.com/41023883/198731015-8bfcc0c6-a6be-4501-850d-507b1d804714.png)


## Financial Statements
Users can select a card and see a detailed view of the financial statements for a given company. Financial statement data is sourced from Sharadar.

![Financial statement example](https://user-images.githubusercontent.com/41023883/198731423-08a0d862-d922-4307-80ae-9e5a8ce320d8.png)
