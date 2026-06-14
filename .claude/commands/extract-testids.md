You are helping extract UI elements from test scenarios to generate stable frontend test selectors.

I will provide a spec containing test scenarios. Some scenarios are marked as **CRIT** and **HIGH** and **MED** and **LOW** .

Your tasks:
1. Only process scenarios marked CRIT ,HIGH,MED and LOW
2. For each scenario, detect every UI element that must be:
   - clicked
   - typed into
   - selected
   - asserted
3. For each UI element, generate:
   - A short description of the element
   - A stable `data-testid` in kebab-case (lowercase, descriptive, short)
   - A CSS selector in the form `[data-testid="testid-name"]`
   - The **UI location/path** of the element in the application (example: "Sidebar → Filter section", "Product page → Price box", "Header → User dropdown")

4. Output ONLY a clean readable list.

Output Format:

## Test Case: <title>
Priority: CRIT | HIGH | MED| LOW

Elements:
- Element: <description>
  Location: <UI path inside the app>
  TestID: <generated-id>
  Selector: [data-testid="<generated-id>"]

At the end, provide a **deduplicated list of all TestIDs**.

Spec: openspec/specs/$ARGUMENTS

Now take the clean list you previously generated and export it into a single file.

Instructions:
- Create one file only.
- Format the content cleanly and professionally.
- Keep the same structure you showed in the chat.
- Use clear headings and spacing.
- The file should contain all scenarios and the final deduplicated TestID list.

File format: Markdown (.md)

File name: testid-mapping.md