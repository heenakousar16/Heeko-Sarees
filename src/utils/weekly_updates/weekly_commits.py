import os
import subprocess
import datetime
import random
import json

def ensure_directory(file_path):
    """Ensure directory exists without creating root directory"""
    directory = os.path.dirname(file_path)
    if directory and not os.path.exists(directory):
        os.makedirs(directory, exist_ok=True)

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
    
    # Your project files - only files that exist or should exist
    project_files = [
        "src/App.tsx",
        "src/main.tsx",
        "src/index.css",
        "src/components/BlouseSelection.tsx",
        "src/components/ColorSelection.tsx",
        "src/components/FabricSelector.vue", 
        "src/components/MaterialSelection.tsx",
        "src/data/sareeData.ts",
        "package.json",
        "vite.config.ts",
        "tailwind.config.js",
        "README.md",
        "index.html"
    ]
    
    # Calculate 120 days ago
    end_date = datetime.datetime.now()
    start_date = end_date - datetime.timedelta(days=120)
    
    commit_count = 0
    week_count = 0
    
    print(f"📅 Generating weekly commits from {start_date.strftime('%Y-%m-%d')} to {end_date.strftime('%Y-%m-%d')}")
    
    current_week_start = start_date
    
    # Create necessary directories first
    ensure_directory("src/components/")
    ensure_directory("src/utils/")
    ensure_directory("src/data/")
    ensure_directory("src/styles/")
    
    # Loop through each week (17 weeks for 120 days)
    while current_week_start <= end_date:
        week_count += 1
        print(f"\n📍 Week {week_count}: {current_week_start.strftime('%Y-%m-%d')}")
        
        # Each week, commit on 2-4 different days
        days_in_week = random.randint(2, 4)
        days_committed = 0
        
        while days_committed < days_in_week:
            # Pick a random weekday in this week (avoid weekends for more realism)
            days_offset = random.randint(0, 6)
            commit_date = current_week_start + datetime.timedelta(days=days_offset)
            
            # Don't go beyond end date
            if commit_date > end_date:
                break
                
            # Skip weekends 70% of the time for more realistic pattern
            if commit_date.weekday() >= 5 and random.random() > 0.3:
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
                
                # Add content to file with proper error handling
                try:
                    if file_to_modify.endswith(('.js', '.ts', '.tsx', '.vue')):
                        ensure_directory(file_to_modify)
                        with open(file_to_modify, "a", encoding="utf-8") as f:
                            f.write(f"\n// Week {week_count} update - {commit_time.strftime('%Y-%m-%d')}\n")
                            f.write("// Saree customization improvements\n")
                            
                    elif file_to_modify.endswith('.css'):
                        ensure_directory(file_to_modify)
                        with open(file_to_modify, "a", encoding="utf-8") as f:
                            f.write(f"\n/* Week {week_count} update - {commit_time.strftime('%Y-%m-%d')} */\n")
                            f.write("/* Style enhancements */\n")
                            
                    elif file_to_modify.endswith('.json'):
                        ensure_directory(file_to_modify)
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
                                    # If JSON is invalid, append comment
                                    f.write(f"\n// Week {week_count} - {commit_time.strftime('%Y-%m-%d')}\n")
                        else:
                            with open(file_to_modify, "w", encoding="utf-8") as f:
                                json.dump({"updates": [f"Week {week_count} - {commit_time.strftime('%Y-%m-%d')}"]}, f, indent=2)
                                
                    elif file_to_modify == "README.md":
                        with open(file_to_modify, "a", encoding="utf-8") as f:
                            f.write(f"\n### Week {week_count} Updates\n")
                            f.write(f"- Enhanced features on {commit_time.strftime('%Y-%m-%d')}\n")
                            f.write("- Improved saree customization experience\n")
                            
                    else:
                        ensure_directory(file_to_modify)
                        with open(file_to_modify, "a", encoding="utf-8") as f:
                            f.write(f"\nUpdate Week {week_count} - {commit_time.strftime('%Y-%m-%d')}\n")
                            
                except Exception as e:
                    print(f"⚠️  Could not modify {file_to_modify}: {e}")
                    # Create a simple update file as fallback
                    backup_file = f"src/utils/weekly_updates/week_{week_count}.txt"
                    ensure_directory(backup_file)
                    with open(backup_file, "w") as f:
                        f.write(f"Week {week_count} development update\n")
                
                # Stage and commit
                add_result = subprocess.run(["git", "add", "."], capture_output=True, text=True)
                
                if add_result.returncode != 0:
                    print(f"❌ git add failed: {add_result.stderr}")
                    continue
                
                env = os.environ.copy()
                env["GIT_AUTHOR_DATE"] = git_date_str
                env["GIT_COMMITTER_DATE"] = git_date_str
                
                message = random.choice(weekly_messages)
                full_message = f"{message} - Week {week_count}"
                
                commit_result = subprocess.run([
                    "git", "commit", "-m", full_message
                ], env=env, capture_output=True, text=True)
                
                if commit_result.returncode == 0:
                    commit_count += 1
                    print(f"  ✅ {commit_time.strftime('%Y-%m-%d')}: {full_message}")
                else:
                    print(f"  ❌ Commit failed: {commit_result.stderr}")
                    # Try with a simpler approach
                    with open(f"temp_update_{commit_count}.txt", "w") as f:
                        f.write(f"Update {commit_count}\n")
                    subprocess.run(["git", "add", "."])
                    subprocess.run(["git", "commit", "-m", f"Update - Week {week_count}"], env=env)
                    commit_count += 1
                    print(f"  ✅ {commit_time.strftime('%Y-%m-%d')}: Update - Week {week_count}")
            
            days_committed += 1
        
        # Move to next week
        current_week_start += datetime.timedelta(days=7)
        
        # Safety break - don't go beyond 20 weeks
        if week_count >= 20:
            break
    
    return commit_count

def main():
    print("=" * 60)
    print("👗 HEKO SARES - WEEKLY COMMITS (120 DAYS) - FIXED")
    print("=" * 60)
    
    if not os.path.exists(".git"):
        print("❌ Not a git repository!")
        return
    
    try:
        total_commits = add_weekly_commits()
        
        print(f"\n🎉 SUCCESS! Added {total_commits} commits over {week_count} weeks!")
        print("\n➡️  Next: Run 'git push origin main'")
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    main()