import os
import subprocess
import datetime
import random
import json

def ensure_directory(file_path):
    """Ensure directory exists for the given file path"""
    directory = os.path.dirname(file_path)
    if directory and not os.path.exists(directory):
        os.makedirs(directory, exist_ok=True)

def add_weekly_commits():
    """Add commits for every week over past 120 days"""
    
    print("📅 Adding weekly commits for past 120 days...")
    
    # Weekly-focused commit messages for saree customization app
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
        "security: implemented security improvements",
        "feat: added blouse design customization",
        "fix: corrected color picker functionality",
        "style: enhanced mobile responsive design",
        "docs: added saree draping tutorials",
        "feat: implemented save design feature",
        "fix: resolved image export issues"
    ]
    
    # Project files that exist in your Heeko Sarees project
    project_files = [
        "src/App.tsx",
        "src/main.tsx",
        "src/index.css",
        "src/components/BlouseSelection.tsx",
        "src/components/ColorSelection.tsx",
        "src/components/FabricSelector.tsx", 
        "src/components/MaterialSelection.tsx",
        "src/data/sareeData.ts",
        "package.json",
        "vite.config.ts",
        "tailwind.config.js",
        "README.md",
        "index.html"
    ]
    
    # Calculate date range - past 120 days (approx 17 weeks)
    end_date = datetime.datetime.now()
    start_date = end_date - datetime.timedelta(days=120)
    
    commit_count = 0
    total_weeks = 17  # 120 days ÷ 7 = ~17 weeks
    
    print(f"📅 Generating commits for {total_weeks} weeks")
    print(f"📅 Date range: {start_date.strftime('%Y-%m-%d')} to {end_date.strftime('%Y-%m-%d')}")
    
    # Create necessary directories
    ensure_directory("src/components/")
    ensure_directory("src/data/")
    ensure_directory("src/utils/")
    
    # Loop through each week
    for week in range(1, total_weeks + 1):
        print(f"\n📍 Processing Week {week}/{total_weeks}")
        
        # Calculate start of this week
        week_start = start_date + datetime.timedelta(days=(week-1)*7)
        
        # 2-4 commit days per week
        commit_days = random.randint(2, 4)
        
        for day_in_week in range(commit_days):
            # Pick a random weekday (0=Monday, 4=Friday)
            day_offset = random.randint(0, 4)
            commit_date = week_start + datetime.timedelta(days=day_offset)
            
            # Don't go beyond current date
            if commit_date > datetime.datetime.now():
                continue
            
            # 1-3 commits per day
            commits_today = random.randint(1, 3)
            
            for commit_num in range(commits_today):
                # Random time during working hours (9 AM - 6 PM)
                hour = random.randint(9, 18)
                minute = random.randint(0, 59)
                second = random.randint(0, 59)
                
                commit_time = commit_date.replace(hour=hour, minute=minute, second=second)
                git_date_str = commit_time.strftime("%Y-%m-%dT%H:%M:%S")
                
                # Select a random file to modify
                file_to_modify = random.choice(project_files)
                
                try:
                    # Add content based on file type
                    if file_to_modify.endswith(('.js', '.ts', '.tsx')):
                        ensure_directory(file_to_modify)
                        with open(file_to_modify, "a", encoding="utf-8") as f:
                            f.write(f"\n// Development update - Week {week}\n")
                            f.write(f"// Date: {commit_time.strftime('%Y-%m-%d %H:%M')}\n")
                            f.write("// Saree customization feature improvements\n")
                            
                    elif file_to_modify.endswith('.css'):
                        ensure_directory(file_to_modify)
                        with open(file_to_modify, "a", encoding="utf-8") as f:
                            f.write(f"\n/* Development update - Week {week} */\n")
                            f.write(f"/* Date: {commit_time.strftime('%Y-%m-%d %H:%M')} */\n")
                            f.write("/* UI and styling enhancements */\n")
                            
                    elif file_to_modify.endswith('.json'):
                        ensure_directory(file_to_modify)
                        if os.path.exists(file_to_modify):
                            with open(file_to_modify, "r+", encoding="utf-8") as f:
                                try:
                                    data = json.load(f)
                                    # Add update timestamp
                                    if "development_updates" not in data:
                                        data["development_updates"] = []
                                    data["development_updates"].append({
                                        "week": week,
                                        "date": commit_time.strftime('%Y-%m-%d %H:%M'),
                                        "description": "Feature enhancements"
                                    })
                                    f.seek(0)
                                    json.dump(data, f, indent=2)
                                    f.truncate()
                                except json.JSONDecodeError:
                                    # If JSON is invalid, append as comment
                                    f.write(f"\n// Week {week} - {commit_time.strftime('%Y-%m-%d %H:%M')}\n")
                        else:
                            with open(file_to_modify, "w", encoding="utf-8") as f:
                                json.dump({
                                    "development_updates": [{
                                        "week": week,
                                        "date": commit_time.strftime('%Y-%m-%d %H:%M'),
                                        "description": "Initial development"
                                    }]
                                }, f, indent=2)
                                
                    elif file_to_modify == "README.md":
                        with open(file_to_modify, "a", encoding="utf-8") as f:
                            f.write(f"\n### Week {week} Development\n")
                            f.write(f"- **Date**: {commit_time.strftime('%Y-%m-%d')}\n")
                            f.write("- **Updates**: Enhanced saree customization features\n")
                            f.write("- **Progress**: Improved user experience and performance\n\n")
                            
                    else:
                        ensure_directory(file_to_modify)
                        with open(file_to_modify, "a", encoding="utf-8") as f:
                            f.write(f"\n# Development Update - Week {week}\n")
                            f.write(f"# Date: {commit_time.strftime('%Y-%m-%d %H:%M')}\n")
                            f.write("# Project: Heeko Sarees Customization\n\n")
                            
                except Exception as e:
                    print(f"⚠️  Could not modify {file_to_modify}: {e}")
                    # Create backup update file
                    backup_file = f"src/utils/weekly_updates/week_{week}_update_{commit_num}.txt"
                    ensure_directory(backup_file)
                    with open(backup_file, "w", encoding="utf-8") as f:
                        f.write(f"Week {week} development update\n")
                        f.write(f"Date: {commit_time.strftime('%Y-%m-%d %H:%M')}\n")
                
                # Stage all changes
                add_result = subprocess.run(["git", "add", "."], capture_output=True, text=True)
                if add_result.returncode != 0:
                    print(f"❌ git add failed: {add_result.stderr}")
                    continue
                
                # Set up environment with custom date
                env = os.environ.copy()
                env["GIT_AUTHOR_DATE"] = git_date_str
                env["GIT_COMMITTER_DATE"] = git_date_str
                
                # Create commit message
                message = random.choice(weekly_messages)
                full_message = f"{message} - Week {week}"
                
                # Create commit
                commit_result = subprocess.run([
                    "git", "commit", "-m", full_message
                ], env=env, capture_output=True, text=True)
                
                if commit_result.returncode == 0:
                    commit_count += 1
                    print(f"  ✅ {commit_time.strftime('%Y-%m-%d')}: {full_message}")
                else:
                    print(f"  ❌ Commit failed: {commit_result.stderr}")
                    # Fallback: create a simple file and commit
                    try:
                        with open(f"fallback_update_{commit_count}.txt", "w") as f:
                            f.write(f"Development update {commit_count}\n")
                        subprocess.run(["git", "add", "."], check=True)
                        subprocess.run(["git", "commit", "-m", f"Development update - Week {week}"], env=env, check=True)
                        commit_count += 1
                        print(f"  ✅ {commit_time.strftime('%Y-%m-%d')}: Development update - Week {week}")
                    except Exception as fallback_error:
                        print(f"  💥 Fallback also failed: {fallback_error}")
    
    return commit_count

def main():
    print("=" * 70)
    print("👗 HEKO SARES - WEEKLY COMMIT HISTORY GENERATOR")
    print("=" * 70)
    print("This script will add 17 weeks of development history")
    print("to make your GitHub contributions show consistent activity.")
    print("=" * 70)
    
    # Check if we're in a git repository
    if not os.path.exists(".git"):
        print("❌ Error: Not a git repository!")
        print("   Please run this script from your project root directory.")
        return
    
    # Check git status
    status_result = subprocess.run(["git", "status"], capture_output=True, text=True)
    if status_result.returncode != 0:
        print("❌ Error: Git is not properly initialized")
        return
    
    try:
        print("🚀 Starting commit generation...")
        total_commits = add_weekly_commits()
        
        print("\n" + "=" * 70)
        print("🎉 COMMIT GENERATION COMPLETE!")
        print("=" * 70)
        print(f"📊 Results:")
        print(f"   • Total weeks processed: 17")
        print(f"   • Total commits created: {total_commits}")
        print(f"   • Average commits per week: {total_commits/17:.1f}")
        print(f"   • Time period: Past 120 days")
        
        print("\n➡️  Next Steps:")
        print("   1. Run: git log --oneline --graph to view commit history")
        print("   2. Run: git push origin main to update GitHub")
        print("   3. If push fails, run: git pull origin main first")
        print("   4. Check your GitHub profile for green contributions!")
        
        print("\n💡 Tip: Your GitHub contribution graph should now show")
        print("     consistent activity for the past 4 months!")
        
    except Exception as e:
        print(f"\n❌ Error during execution: {e}")
        print("   Please check your git configuration and try again.")

if __name__ == "__main__":
    main()