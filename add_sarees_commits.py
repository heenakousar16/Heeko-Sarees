import os
import subprocess
import datetime
import random
import json

def add_weekly_commits():
    """Add commits for every week over past 120 days"""
    
    print("📅 Adding weekly commits for past 120 days...")
    
    # Weekly-focused commit messages
    weekly_messages = [
        "feat: enhanced saree customization features",
        "fix: resolved 3D preview rendering issues",
        "style: improved UI components and layouts",
        "docs: updated documentation and user guides",
        "refactor: optimized component structure",
        "perf: improved application performance",
        "content: added new fabric patterns",
        "chore: updated dependencies and configurations",
        "test: added unit tests for core functionality",
        "security: implemented security improvements"
    ]
    
    # Your project files
    project_files = [
        "src/App.vue",
        "src/main.js",
        "src/components/CustomizationPanel.vue",
        "src/components/FabricSelector.vue",
        "src/components/ColorPicker.vue", 
        "src/components/Preview3D.vue",
        "src/styles/main.css",
        "src/utils/helpers.js",
        "src/data/patterns.json",
        "package.json",
        "vite.config.ts",
        "tailwind.config.js",
        "README.md",
        "index.html",
        "yarn.lock",
        "eslint.config.js",
        "package-lock.json",
        "postcss.config.js",
        "tailwind.config.js",
        "tsconfig.json",
        "tsconfig.node.json",
        
    ]
    
    # Calculate 120 days ago
    end_date = datetime.datetime.now()
    start_date = end_date - datetime.timedelta(days=120)
    
    commit_count = 0
    week_count = 0
    
    print(f"📅 Generating weekly commits from {start_date.strftime('%Y-%m-%d')} to {end_date.strftime('%Y-%m-%d')}")
    
    current_date = start_date
    
    # Loop through each week
    while current_date <= end_date:
        week_count += 1
        print(f"\n📍 Week {week_count}: {current_date.strftime('%Y-%m-%d')}")
        
        # Each week, commit on 2-4 different days
        days_in_week = random.randint(2, 4)
        
        for day_in_week in range(days_in_week):
            # Skip to a random day in the week (0-6 days from current week start)
            commit_date = current_date + datetime.timedelta(days=random.randint(0, 6))
            
            # Don't go beyond end date
            if commit_date > end_date:
                continue
            
            # 1-3 commits per commit day
            commits_today = random.randint(1, 3)
            
            for commit_num in range(commits_today):
                # Working hours
                hour = random.randint(9, 18)
                minute = random.randint(0, 59)
                
                commit_time = commit_date.replace(hour=hour, minute=minute)
                git_date_str = commit_time.strftime("%Y-%m-%dT%H:%M:%S")
                
                # Select file to modify
                file_to_modify = random.choice(project_files)
                os.makedirs(os.path.dirname(file_to_modify), exist_ok=True)
                
                # Add content to file
                try:
                    if file_to_modify.endswith(('.js', '.ts', '.vue')):
                        with open(file_to_modify, "a", encoding="utf-8") as f:
                            f.write(f"\n// Week {week_count} update - {commit_time.strftime('%Y-%m-%d')}\n")
                    elif file_to_modify.endswith('.css'):
                        with open(file_to_modify, "a", encoding="utf-8") as f:
                            f.write(f"\n/* Week {week_count} update - {commit_time.strftime('%Y-%m-%d')} */\n")
                    elif file_to_modify.endswith('.json'):
                        if os.path.exists(file_to_modify):
                            with open(file_to_modify, "r+", encoding="utf-8") as f:
                                try:
                                    data = json.load(f)
                                    if "updates" not in data:
                                        data["updates"] = []
                                    data["updates"].append(f"Week {week_count} - {commit_time.strftime('%Y-%m-%d')}")
                                    f.seek(0)
                                    json.dump(data, f, indent=2)
                                    f.truncate()
                                except:
                                    f.write(f"\n// Week {week_count} - {commit_time.strftime('%Y-%m-%d')}\n")
                    elif file_to_modify == "README.md":
                        with open(file_to_modify, "a", encoding="utf-8") as f:
                            f.write(f"\n### Week {week_count} Updates\n")
                            f.write(f"- Enhanced features on {commit_time.strftime('%Y-%m-%d')}\n")
                    else:
                        with open(file_to_modify, "a", encoding="utf-8") as f:
                            f.write(f"\nUpdate Week {week_count} - {commit_time.strftime('%Y-%m-%d')}\n")
                            
                except Exception as e:
                    print(f"⚠️  Could not modify {file_to_modify}: {e}")
                    # Create backup file
                    with open(f"src/utils/weekly_updates/week_{week_count}.txt", "w") as f:
                        f.write(f"Week {week_count} development update\n")
                
                # Stage and commit
                subprocess.run(["git", "add", "."], check=True)
                
                env = os.environ.copy()
                env["GIT_AUTHOR_DATE"] = git_date_str
                env["GIT_COMMITTER_DATE"] = git_date_str
                
                message = random.choice(weekly_messages)
                full_message = f"{message} - Week {week_count}"
                
                result = subprocess.run([
                    "git", "commit", "-m", full_message
                ], env=env, capture_output=True, text=True)
                
                if result.returncode == 0:
                    commit_count += 1
                    print(f"  ✅ {commit_time.strftime('%Y-%m-%d')}: {full_message}")
                else:
                    print(f"  ❌ Failed: {result.stderr}")
        
        # Move to next week
        current_date += datetime.timedelta(days=7)
    
    return commit_count

def main():
    print("=" * 60)
    print("👗 HEKO SARES - WEEKLY COMMITS (120 DAYS)")
    print("=" * 60)
    
    if not os.path.exists(".git"):
        print("❌ Not a git repository!")
        return
    
    try:
        # Create necessary directories
        os.makedirs("src/utils/weekly_updates", exist_ok=True)
        os.makedirs("src/data", exist_ok=True)
        
        total_commits = add_weekly_commits()
        
        print(f"\n🎉 SUCCESS! Added {total_commits} commits over {120//7} weeks!")
        print("\n➡️  Next: Run 'git push origin main'")
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    main()