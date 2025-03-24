# TaskFlow

TaskFlow is a collaborative project management platform inspired by Trello. It helps teams organize their projects, track progress, and improve productivity using an intuitive Kanban board system.

# Features

1. Workspace
   - A Workspace in Trello is a container that holds multiple boards related to a specific project, team, or organization. It helps keep your work organized and makes collaboration easier by grouping related boards together.
2. Board
    - Boards represent projects or large tasks.
3. List
    - Lists are used to categorize stages (e.g., "To Do," "In Progress," "Done").
4. Card
    - Cards represent individual tasks and can contain checklists, due dates, attachments, and more.
    - Cards has (title , description , activity logs (personal and system) , label (color label) , join member to card , move to another list , copy card , has checklist (with checkbox and percent) , attachment , set cover for card , set date for this card)

## Drag and drop 
   - Users can easily move cards between lists to reflect progress.

## Collaboration
   - Team members can comment, tag others, assign tasks, and share files within cards.

## Automation with Butler
   - Trello offers Butler, an automation tool that can create rules, buttons, and scheduled commands to streamline workflows.

## Power-Ups (Integrations)
   - Trello integrates with tools like Slack, Google Drive, Jira, and more, allowing extended functionality.

--------------------------------------------------------------------------------------------------
# Our features
1. Create Workspace | Edit  for team representation
2. create Borad | Edit | Delete -> up to 5 Item
3. Create list and asign it to special Borad -> up to 3 item
4. Create Card into list and drag & drop cards between lists
5. Set deadLine time to task|cards and change color after expired
6. Edit | delete | done works in Cards
7. Archive Cards



# useful git codes

```shell

git restore --staged .
git rm --cached -r .
```


# how to merge from upstream

1. Add the Upstream Repository (if not added already)

```shell

git remote add upstream <upstream-repo-url>
```
   * Check if it is added correctly:

   ```
   git remote -v
   ```

2. Fetch the Latest Changes from Upstream

```shell

git fetch upstream
```

This will retrieve all branches from the upstream repository.

3. Checkout (Switch) Your Target Branch

```shell
git checkout my-branch
```
(Replace my-branch with the branch where you want to merge the upstream changes.)

4. Merge the Upstream Branch into Your Branch

```shell
git merge upstream/upstream-branch
```
(Replace upstream-branch with the branch name you want to merge from upstream.)

5. Resolve Merge Conflicts (if any)
   If there are conflicts, Git will notify you. Open the conflicted files, resolve conflicts, and then run:

```shell
git add .
git commit -m "Resolved merge conflicts"
```

6. Push the Changes to Your Repository


```shell
git push origin my-branch
```

Now your branch contains the latest changes from the upstream repository. 🚀


# Enable tailwind DarkMode

for Enableing dark mode in your app replace all `strak` classess in your html code with `dark` and enjoy :)

# Reinitialize All Tooltips After Adding New Elements

After adding new elements, manually reinitialize all tooltips using Flowbite’s initTooltips() function.

```javascript
// ✅ 4️⃣ Reinitialize ALL tooltips (Fixes old + new tooltips)
initTooltips();
initDropdowns();
```

## Drag & drop tip and tricks in trello

1. source element to start drag most Only be " Cards "
2. you most apply `draggable="true"` parameters to all cards that you want drag between lists
3. target element that you can drop cards over there may be " Cards & Lists" you most implement drag and drop event actions for both
4. you most use `event.preventDefault();` in `dragover` listener to apply drop event correctly
5. in our case in `dragend` event listener we most use `initDropdowns();` to work dropdown menu in cards correctly

