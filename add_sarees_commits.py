import os
import subprocess
import datetime
import random
import json

def add_sarees_commits():
    """Add realistic commits for past 120 days to Heko Sarees project"""
    
    print("👗 Adding 120 days of commits to Heko Sarees project...")
    
    # Commit messages specific to saree customization app
    commit_messages = [
        # UI/UX Improvements
        "feat: added 3D saree preview functionality",
        "feat: implemented fabric texture selection",
        "feat: added color picker for saree customization",
        "feat: implemented blouse design editor",
        "feat: added drape style selection",
        "feat: created pattern overlay system",
        "feat: added border design customization",
        "feat: implemented save design feature",
        "feat: added share design functionality",
        "feat: created design gallery view",
        
        # Bug fixes
        "fix: resolved 3D model loading issue",
        "fix: corrected color picker accuracy",
        "fix: fixed fabric texture rendering",
        "fix: resolved mobile touch events",
        "fix: corrected zoom functionality",
        "fix: fixed design save/load bug",
        "fix: resolved image export quality",
        "fix: corrected measurement calculations",
        "fix: fixed border alignment issue",
        "fix: resolved pattern scaling problem",
        
        # Component updates
        "refactor: improved CustomizationPanel component",
        "refactor: optimized 3D preview performance",
        "refactor: enhanced fabric selection UI",
        "refactor: improved color palette system",
        "refactor: optimized image processing",
        "refactor: enhanced responsive design",
        "refactor: improved state management",
        "refactor: optimized bundle size",
        
        # Style and design
        "style: updated color scheme for better accessibility",
        "style: improved button designs and hover effects",
        "style: enhanced fabric preview cards",
        "style: updated typography scale",
        "style: improved mobile navigation",
        "style: added loading animations",
        "style: enhanced tooltip designs",
        "style: updated icon system",
        
        # Content and data
        "content: added new silk fabric options",
        "content: updated cotton fabric catalog",
        "content: added festival collection patterns",
        "content: updated border design library",
        "content: added new blouse styles",
        "content: updated drape tutorials",
        "content: added customer design examples",
        "content: updated fabric care instructions",
        
        # Performance
        "perf: optimized 3D model loading",
        "perf: implemented image lazy loading",
        "perf: reduced initial bundle size",
        "perf: optimized fabric texture loading",
        "perf: improved color rendering speed",
        "perf: implemented virtual scrolling for patterns",
        
        # Configuration
        "chore: updated Vite configuration",
        "chore: upgraded Tailwind CSS",
        "chore: updated TypeScript config",
        "chore: added new ESLint rules",
        "chore: updated package dependencies",
        "chore: improved build process",
        "chore: added PWA capabilities",
        "chore: updated SEO meta tags"
    ]
    
    # Your existing project files
    project_files = [
        "src/App.vue",  # or App.js/App.tsx depending on your framework
        "src/main.js",
        "src/components/CustomizationPanel.vue",
        "src/components/FabricSelector.vue", 
        "src/components/ColorPicker.vue",
        "src/components/Preview3D.vue",
        "src/components/BlouseEditor.vue",
        "src/components/PatternOverlay.vue",
        "src/styles/main.css",
        "src/utils/helpers.js",
        "src/utils/fabricData.js",
        "src/data/patterns.json",
        "src/data/fabrics.json",
        "src/data/colors.json",
        "public/index.html",
        "public/manifest.json",
        "package.json",
        "vite.config.ts",
        "tailwind.config.js",
        "tsconfig.json",
        "README.md"
    ]
    
    # Calculate date range - past 120 days
    end_date = datetime.datetime.now()
    start_date = end_date - datetime.timedelta(days=120)
    current_date = start_date
    
    commit_count = 0
    total_days = 120
    
    print(f"📅 Generating commits from {start_date.strftime('%Y-%m-%d')} to {end_date.strftime('%Y-%m-%d')}")
    
    for day in range(total_days):
        # Realistic commit pattern - more on weekdays
        if current_date.weekday() >= 5:  # Weekend
            if random.random() > 0.3:  # 70% chance to skip weekends
                current_date += datetime.timedelta(days=1)
                continue
            commits_today = random.choices([0, 1], weights=[0.6, 0.4])[0]
        else:  # Weekday
            commits_today = random.choices([0, 1, 2, 3], weights=[0.1, 0.5, 0.3, 0.1])[0]
        
        for commit_num in range(commits_today):
            # Working hours
            hour = random.randint(9, 18)
            minute = random.randint(0, 59)
            second = random.randint(0, 59)
            
            commit_date = current_date.replace(hour=hour, minute=minute, second=second)
            git_date_str = commit_date.strftime("%Y-%m-%dT%H:%M:%S")
            
            # Select file to modify
            file_to_modify = random.choice(project_files)
            
            # Ensure directory exists
            os.makedirs(os.path.dirname(file_to_modify), exist_ok=True)
            
            # Add realistic content based on file type
            try:
                if file_to_modify.endswith(('.js', '.ts', '.vue', '.jsx', '.tsx')):
                    with open(file_to_modify, "a", encoding="utf-8") as f:
                        f.write(f"\n// Update: {commit_date.strftime('%Y-%m-%d %H:%M')}\n")
                        f.write("// Code improvements and feature enhancements\n")
                        
                elif file_to_modify.endswith('.css'):
                    with open(file_to_modify, "a", encoding="utf-8") as f:
                        f.write(f"\n/* Update: {commit_date.strftime('%Y-%m-%d %H:%M')} */\n")
                        f.write("/* Style enhancements and responsive fixes */\n")
                        
                elif file_to_modify.endswith('.json'):
                    # For JSON files, we need to be careful not to break the structure
                    if os.path.exists(file_to_modify):
                        with open(file_to_modify, "r+", encoding="utf-8") as f:
                            try:
                                data = json.load(f)
                                # Add a timestamp field if it doesn't exist
                                if "lastUpdated" not in data:
                                    data["lastUpdated"] = commit_date.strftime('%Y-%m-%d %H:%M:%S')
                                f.seek(0)
                                json.dump(data, f, indent=2)
                                f.truncate()
                            except json.JSONDecodeError:
                                # If JSON is invalid, append a comment
                                f.write(f"\n// Update: {commit_date.strftime('%Y-%m-%d %H:%M')}\n")
                    else:
                        with open(file_to_modify, "w", encoding="utf-8") as f:
                            json.dump({"lastUpdated": commit_date.strftime('%Y-%m-%d %H:%M:%S')}, f, indent=2)
                            
                elif file_to_modify.endswith('.html'):
                    with open(file_to_modify, "a", encoding="utf-8") as f:
                        f.write(f"\n<!-- Update: {commit_date.strftime('%Y-%m-%d %H:%M')} -->\n")
                        
                elif file_to_modify == "README.md":
                    with open(file_to_modify, "a", encoding="utf-8") as f:
                        f.write(f"\n## Update {commit_date.strftime('%Y-%m-%d')}\n")
                        f.write("Enhanced saree customization features and improved user experience.\n")
                        
                else:
                    with open(file_to_modify, "a", encoding="utf-8") as f:
                        f.write(f"\nUpdate: {commit_date.strftime('%Y-%m-%d %H:%M')}\n")
                        
            except Exception as e:
                print(f"⚠️  Could not modify {file_to_modify}: {e}")
                # Create a simple update file instead
                with open(f"src/utils/updates/update_{commit_count}.txt", "w", encoding="utf-8") as f:
                    f.write(f"Project update {commit_count}\n")
                file_to_modify = f"src/utils/updates/update_{commit_count}.txt"
            
            # Stage changes
            subprocess.run(["git", "add", "."], check=True)
            
            # Prepare environment with custom date
            env = os.environ.copy()
            env["GIT_AUTHOR_DATE"] = git_date_str
            env["GIT_COMMITTER_DATE"] = git_date_str
            
            # Select commit message
            message = random.choice(commit_messages)
            
            # Create commit
            result = subprocess.run([
                "git", "commit", "-m", message
            ], env=env, capture_output=True, text=True)
            
            if result.returncode == 0:
                commit_count += 1
            else:
                # If commit fails, create a simple file and commit
                with open(f"update_{commit_count}.txt", "w") as f:
                    f.write(f"Project update {commit_count}\n")
                subprocess.run(["git", "add", "."], check=True)
                subprocess.run(["git", "commit", "-m", message], env=env, check=True)
                commit_count += 1
            
            # Show progress
            if commit_count % 10 == 0:
                print(f"  📝 Created {commit_count} commits...")
        
        # Move to next day
        current_date += datetime.timedelta(days=1)
    
    return commit_count

def main():
    print("=" * 70)
    print("👗 HEKO SARES - 120 DAYS COMMIT HISTORY")
    print("=" * 70)
    print("Adding realistic development history to your saree customization app")
    print("=" * 70)
    
    # Check if we're in a git repository
    if not os.path.exists(".git"):
        print("❌ Error: Not a git repository!")
        print("   Navigate to your Heko Sarees project root first.")
        return
    
    try:
        # Create necessary directories
        os.makedirs("src/utils/updates", exist_ok=True)
        os.makedirs("src/data", exist_ok=True)
        os.makedirs("src/components", exist_ok=True)
        
        # Add 120 days of commits
        total_commits = add_sarees_commits()
        
        print(f"\n🎉 SUCCESS! Added {total_commits} commits over 120 days!")
        print("\n📊 Summary:")
        print(f"   • Time period: Past 120 days")
        print(f"   • Total commits: {total_commits}")
        print(f"   • Average commits per day: {total_commits/120:.1f}")
        print("\n➡️  Next steps:")
        print("   1. Run: git log --oneline --graph to see commit history")
        print("   2. Run: git push origin main to update GitHub")
        print("   3. Check your GitHub profile for green contributions!")
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    main()