import { useState, useEffect, useCallback, useRef } from "react";

const TEAMS = [
  { id: "ARG", name: "Argentina", flag: "🇦🇷", group: "A", color: "#74ACDF" },
  { id: "FRA", name: "France", flag: "🇫🇷", group: "A", color: "#0055A4" },
  { id: "BRA", name: "Brazil", flag: "🇧🇷", group: "B", color: "#009C3B" },
  { id: "ENG", name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "B", color: "#CF081F" },
  { id: "ESP", name: "Spain", flag: "🇪🇸", group: "C", color: "#AA151B" },
  { id: "GER", name: "Germany", flag: "🇩🇪", group: "C", color: "#000000" },
  { id: "POR", name: "Portugal", flag: "🇵🇹", group: "D", color: "#006600" },
  { id: "NED", name: "Netherlands", flag: "🇳🇱", group: "D", color: "#FF6600" },
  { id: "ITA", name: "Italy", flag: "🇮🇹", group: "E", color: "#003399" },
  { id: "URU", name: "Uruguay", flag: "🇺🇾", group: "E", color: "#5AAAD7" },
  { id: "COL", name: "Colombia", flag: "🇨🇴", group: "F", color: "#FCD116" },
  { id: "MEX", name: "Mexico", flag: "🇲🇽", group: "F", color: "#006847" },
  { id: "USA", name: "USA", flag: "🇺🇸", group: "G", color: "#B22234" },
  { id: "MAR", name: "Morocco", flag: "🇲🇦", group: "G", color: "#C1272D" },
  { id: "SEN", name: "Senegal", flag: "🇸🇳", group: "H", color: "#00853F" },
  { id: "JAP", name: "Japan", flag: "🇯🇵", group: "H", color: "#BC002D" },
  { id: "AUS", name: "Australia", flag: "🇦🇺", group: "A", color: "#00843D" },
  { id: "NGA", name: "Nigeria", flag: "🇳🇬", group: "B", color: "#008751" },
  { id: "BEL", name: "Belgium", flag: "🇧🇪", group: "C", color: "#EF3340" },
  { id: "SUI", name: "Switzerland", flag: "🇨🇭", group: "D", color: "#FF0000" },
  { id: "CRO", name: "Croatia", flag: "🇭🇷", group: "E", color: "#FF0000" },
  { id: "DEN", name: "Denmark", flag: "🇩🇰", group: "F", color: "#C60C30" },
  { id: "KOR", name: "South Korea", flag: "🇰🇷", group: "G", color: "#003478" },
  { id: "ECU", name: "Ecuador", flag: "🇪🇨", group: "H", color: "#FFD100" },
];

const MOCK_FIXTURES = [
  { id: 1, home: "ARG", away: "FRA", homeScore: 3, awayScore: 3, date: "2026-06-14", stage: "group", group: "A", played: true },
  { id: 2, home: "BRA", away: "ENG", homeScore: 2, awayScore: 1, date: "2026-06-14", stage: "group", group: "B", played: true },
  { id: 3, home: "ESP", away: "GER", homeScore: 1, awayScore: 0, date: "2026-06-15", stage: "group", group: "C", played: true },
  { id: 4, home: "POR", away: "NED", homeScore: 2, awayScore: 2, date: "2026-06-15", stage: "group", group: "D", played: true },
  { id: 5, home: "ITA", away: "URU", homeScore: null, awayScore: null, date: "2026-06-18", stage: "group", group: "E", played: false },
  { id: 6, home: "COL", away: "MEX", homeScore: null, awayScore: null, date: "2026-06-19", stage: "group", group: "F", played: false },
  { id: 7, home: "USA", away: "MAR", homeScore: null, awayScore: null, date: "2026-06-20", stage: "group", group: "G", played: false },
  { id: 8, home: "ARG", away: "AUS", homeScore: null, awayScore: null, date: "2026-06-22", stage: "group", group: "A", played: false },
];

const INITIAL_USERS = [
  { id: "admin1", name: "Lucia Torrenegra", email: "lucia@sell2rent.com", password: "Admin123!", role: "admin", team: "ARG", points: 0, avatar: "LT", joined: "2026-06-01" },
  { id: "u1", name: "Alex Arguelles", email: "alex@sell2rent.com", password: "Pass123!", role: "user", team: "BRA", points: 18, avatar: "AA", joined: "2026-06-01" },
  { id: "u2", name: "Daniel Kattan", email: "daniel@sell2rent.com", password: "Pass123!", role: "user", team: "ESP", points: 14, avatar: "DK", joined: "2026-06-01" },
  { id: "u3", name: "Merinda Gabr", email: "merinda@sell2rent.com", password: "Pass123!", role: "user", team: "FRA", points: 11, avatar: "MG", joined: "2026-06-01" },
  { id: "u4", name: "Santiago Rodriguez", email: "santiago@sell2rent.com", password: "Pass123!", role: "user", team: "ENG", points: 9, avatar: "SR", joined: "2026-06-01" },
  { id: "u5", name: "Carolina Tovar", email: "carolina@sell2rent.com", password: "Pass123!", role: "user", team: null, points: 0, avatar: "CT", joined: "2026-06-01" },
];

const INITIAL_CHALLENGES = [
  { id: "c1", title: "Predict the Champion", description: "Who will win the World Cup?", type: "prediction", deadline: "2026-06-20", points: 15, active: true },
  { id: "c2", title: "Top Scorer Pick", description: "Who will be the top scorer of the tournament?", type: "top_scorer", deadline: "2026-06-22", points: 10, active: true },
  { id: "c3", title: "Upset of the Week", description: "Predict the biggest upset this week", type: "upset", deadline: "2026-06-19", points: 8, active: false },
];

const INITIAL_ANNOUNCEMENTS = [
  { id: "a1", text: "🏆 Argentina drew 3-3 with France in a thriller!", time: "2h ago", type: "match" },
  { id: "a2", text: "📣 New challenge available! Predict the Top Scorer.", time: "4h ago", type: "challenge" },
  { id: "a3", text: "⚽ Brazil defeats England 2-1!", time: "6h ago", type: "match" },
];

const POINT_RULES = {
  win: 3, draw: 1, goalsBonus: 2, cleanSheet: 2, penalties: 3,
  r16qualify: 5, r16win: 5, qfWin: 7, sfWin: 10, champion: 20
};

const getTeam = (id) => TEAMS.find(t => t.id === id);
const getInitials = (name) => name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

const AVATAR_COLORS = ["#6366f1","#8b5cf6","#06b6d4","#10b981","#f59e0b","#ef4444","#ec4899","#3b82f6"];
const getAvatarColor = (name) => AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

export default function App() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [fixtures, setFixtures] = useState(MOCK_FIXTURES);
  const [challenges, setChallenges] = useState(INITIAL_CHALLENGES);
  const [announcements, setAnnouncements] = useState(INITIAL_ANNOUNCEMENTS);
  const [currentUser, setCurrentUser] = useState(null);
  const [page, setPage] = useState("landing");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState("");
  const [notification, setNotification] = useState(null);
  const [regForm, setRegForm] = useState({ name: "", email: "", password: "" });
  const [regError, setRegError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [adminTab, setAdminTab] = useState("users");
  const [editPointsUser, setEditPointsUser] = useState(null);
  const [editPointsVal, setEditPointsVal] = useState(0);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [newChallenge, setNewChallenge] = useState({ title: "", description: "", points: 5, deadline: "" });
  const [challengeModal, setChallengeModal] = useState(null);
  const [challengeAnswer, setChallengeAnswer] = useState("");
  const [userChallenges, setUserChallenges] = useState({});
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [teamFilter, setTeamFilter] = useState("");
  const [confetti, setConfetti] = useState(false);
  const [editFixture, setEditFixture] = useState(null);
  const [showAnnModal, setShowAnnModal] = useState(false);
  const notifTimer = useRef(null);

  const showNotif = useCallback((msg, type = "success") => {
    setNotification({ msg, type });
    clearTimeout(notifTimer.current);
    notifTimer.current = setTimeout(() => setNotification(null), 3500);
  }, []);

  const login = () => {
    const user = users.find(u => u.email === loginEmail && u.password === loginPass);
    if (!user) { setLoginError("Invalid email or password"); return; }
    setCurrentUser(user);
    setLoginError("");
    setPage("dashboard");
    showNotif(`Welcome back, ${user.name.split(" ")[0]}! ⚽`);
  };

  const register = () => {
    if (!regForm.name || !regForm.email || !regForm.password) { setRegError("All fields required"); return; }
    if (users.find(u => u.email === regForm.email)) { setRegError("Email already in use"); return; }
    const newUser = {
      id: `u${Date.now()}`, name: regForm.name, email: regForm.email,
      password: regForm.password, role: "user", team: null, points: 0,
      avatar: getInitials(regForm.name), joined: new Date().toISOString().split("T")[0]
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setPage("dashboard");
    setRegError("");
    showNotif("Account created! Pick your team to get started 🏆");
  };

  const logout = () => { setCurrentUser(null); setPage("landing"); };

  const selectTeam = (teamId) => {
    const taken = users.find(u => u.id !== currentUser.id && u.team === teamId);
    if (taken) { showNotif(`${getTeam(teamId).name} is already taken by ${taken.name.split(" ")[0]}!`, "error"); return; }
    setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, team: teamId } : u));
    setCurrentUser(prev => ({ ...prev, team: teamId }));
    setShowTeamModal(false);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 4000);
    showNotif(`${getTeam(teamId).flag} ${getTeam(teamId).name} is your team! Let's go!`);
  };

  const updatePoints = (userId, newPts) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, points: Number(newPts) } : u));
    if (currentUser?.id === userId) setCurrentUser(prev => ({ ...prev, points: Number(newPts) }));
    setEditPointsUser(null);
    showNotif("Points updated!");
  };

  const updateFixture = (fId, home, away) => {
    setFixtures(prev => prev.map(f => f.id === fId ? { ...f, homeScore: Number(home), awayScore: Number(away), played: true } : f));
    setEditFixture(null);
    showNotif("Match result saved!");
  };

  const postAnnouncement = () => {
    if (!newAnnouncement.trim()) return;
    const ann = { id: `a${Date.now()}`, text: newAnnouncement, time: "Just now", type: "admin" };
    setAnnouncements(prev => [ann, ...prev]);
    setNewAnnouncement("");
    setShowAnnModal(false);
    showNotif("Announcement posted!");
  };

  const addChallenge = () => {
    if (!newChallenge.title) return;
    const c = { ...newChallenge, id: `c${Date.now()}`, active: true, type: "custom" };
    setChallenges(prev => [c, ...prev]);
    setNewChallenge({ title: "", description: "", points: 5, deadline: "" });
    showNotif("Challenge created!");
  };

  const submitChallenge = (cId) => {
    if (!challengeAnswer.trim()) return;
    const key = `${currentUser.id}_${cId}`;
    setUserChallenges(prev => ({ ...prev, [key]: challengeAnswer }));
    setChallengeModal(null);
    setChallengeAnswer("");
    showNotif("Challenge submitted! Points pending review 🎯");
  };

  const hasDoneChallenge = (cId) => userChallenges[`${currentUser?.id}_${cId}`];

  const takenTeams = users.filter(u => u.team && u.id !== currentUser?.id).map(u => u.team);
  const sortedUsers = [...users].sort((a, b) => b.points - a.points);
  const myRank = sortedUsers.findIndex(u => u.id === currentUser?.id) + 1;
  const myUser = users.find(u => u.id === currentUser?.id);
  const myTeam = myUser?.team ? getTeam(myUser.team) : null;

  const NAV = currentUser?.role === "admin"
    ? ["dashboard", "leaderboard", "fixtures", "admin"]
    : ["dashboard", "leaderboard", "fixtures", "challenges"];

  const navLabel = (p) => p === "admin" ? "Admin" : p.charAt(0).toUpperCase() + p.slice(1);

  return (
    <div style={{ fontFamily: "'Rajdhani', 'Oswald', sans-serif", minHeight: "100vh", background: "#0a0e1a", color: "#e8eaf6", position: "relative", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@700;900&display=swap" rel="stylesheet" />

      {confetti && <ConfettiEffect />}
      {notification && (
        <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999, background: notification.type === "error" ? "#7f1d1d" : "#064e3b", border: `1px solid ${notification.type === "error" ? "#ef4444" : "#10b981"}`, borderRadius: 12, padding: "14px 20px", fontSize: 15, fontWeight: 600, color: "#fff", maxWidth: 320, boxShadow: "0 8px 32px rgba(0,0,0,0.5)", animation: "slideIn 0.3s ease" }}>
          {notification.msg}
        </div>
      )}

      <style>{`
        @keyframes slideIn { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:.6; } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); } }
        @keyframes confettiFall { 0% { transform: translateY(-20px) rotate(0deg); opacity:1; } 100% { transform: translateY(600px) rotate(720deg); opacity:0; } }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #111827; } ::-webkit-scrollbar-thumb { background: #374151; border-radius: 3px; }
        .nav-btn { background: none; border: none; color: #9ca3af; font-family: inherit; font-size: 13px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; padding: 8px 16px; cursor: pointer; border-radius: 8px; transition: all 0.2s; }
        .nav-btn:hover, .nav-btn.active { color: #00e5ff; background: rgba(0,229,255,0.08); }
        .card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 20px; }
        .card-glow { box-shadow: 0 0 30px rgba(0,229,255,0.08); }
        .btn-primary { background: linear-gradient(135deg, #00e5ff, #006eff); color: #000; border: none; border-radius: 10px; padding: 12px 24px; font-family: inherit; font-size: 14px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; transition: all 0.2s; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,229,255,0.3); }
        .btn-secondary { background: rgba(255,255,255,0.06); color: #e8eaf6; border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; padding: 10px 20px; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .btn-secondary:hover { background: rgba(255,255,255,0.1); }
        .input-field { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; padding: 12px 16px; font-family: inherit; font-size: 15px; color: #e8eaf6; width: 100%; box-sizing: border-box; transition: border 0.2s; outline: none; }
        .input-field:focus { border-color: #00e5ff; }
        .input-field::placeholder { color: #6b7280; }
        .badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; }
        .tab { background: none; border: none; font-family: inherit; font-size: 13px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; padding: 8px 18px; cursor: pointer; border-radius: 8px; color: #6b7280; transition: all 0.2s; }
        .tab.active { background: rgba(0,229,255,0.1); color: #00e5ff; }
        .team-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 14px; cursor: pointer; transition: all 0.2s; text-align: center; }
        .team-card:hover:not(.taken):not(.selected) { border-color: #00e5ff; transform: translateY(-2px); background: rgba(0,229,255,0.06); }
        .team-card.taken { opacity: 0.35; cursor: not-allowed; }
        .team-card.selected { border-color: #10b981; background: rgba(16,185,129,0.1); }
      `}</style>

      {page === "landing" && <LandingPage onLogin={() => setPage("login")} />}

      {page === "login" && (
        <LoginPage
          email={loginEmail} setEmail={setLoginEmail}
          pass={loginPass} setPass={setLoginPass}
          error={loginError} onLogin={login}
          isRegistering={isRegistering} setIsRegistering={setIsRegistering}
          regForm={regForm} setRegForm={setRegForm}
          regError={regError} onRegister={register}
          onBack={() => setPage("landing")}
        />
      )}

      {currentUser && (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          {/* Header */}
          <header style={{ background: "rgba(10,14,26,0.95)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 24px", position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(12px)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 24 }}>⚽</span>
                <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 16, fontWeight: 900, background: "linear-gradient(135deg, #00e5ff, #006eff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>S2R WORLD CUP</span>
              </div>
              <nav style={{ display: "flex", gap: 4 }}>
                {NAV.map(p => (
                  <button key={p} className={`nav-btn ${page === p ? "active" : ""}`} onClick={() => setPage(p)}>{navLabel(p)}</button>
                ))}
              </nav>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {myTeam && <span style={{ fontSize: 20 }}>{myTeam.flag}</span>}
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: getAvatarColor(currentUser.name), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff" }}>{getInitials(currentUser.name)}</div>
                <button className="btn-secondary" style={{ padding: "6px 14px", fontSize: 12 }} onClick={logout}>Logout</button>
              </div>
            </div>
          </header>

          <main style={{ flex: 1, maxWidth: 1200, margin: "0 auto", width: "100%", padding: "28px 24px", boxSizing: "border-box" }}>
            {page === "dashboard" && (
              <DashboardPage
                currentUser={myUser} myTeam={myTeam} myRank={myRank}
                users={users} sortedUsers={sortedUsers}
                fixtures={fixtures} announcements={announcements}
                challenges={challenges} hasDone={hasDoneChallenge}
                onSelectTeam={() => setShowTeamModal(true)}
                onChallenge={(c) => { setChallengeModal(c); setChallengeAnswer(""); }}
              />
            )}
            {page === "leaderboard" && (
              <LeaderboardPage sortedUsers={sortedUsers} currentUser={myUser} />
            )}
            {page === "fixtures" && (
              <FixturesPage fixtures={fixtures} isAdmin={currentUser.role === "admin"} onEdit={(f) => setEditFixture(f)} />
            )}
            {page === "challenges" && (
              <ChallengesPage challenges={challenges} hasDone={hasDoneChallenge}
                onChallenge={(c) => { setChallengeModal(c); setChallengeAnswer(""); }} />
            )}
            {page === "admin" && currentUser.role === "admin" && (
              <AdminPage
                users={users} challenges={challenges} announcements={announcements} fixtures={fixtures}
                adminTab={adminTab} setAdminTab={setAdminTab}
                editPointsUser={editPointsUser} setEditPointsUser={setEditPointsUser}
                editPointsVal={editPointsVal} setEditPointsVal={setEditPointsVal}
                onUpdatePoints={updatePoints}
                newAnnouncement={newAnnouncement} setNewAnnouncement={setNewAnnouncement}
                onPostAnn={postAnnouncement}
                newChallenge={newChallenge} setNewChallenge={setNewChallenge}
                onAddChallenge={addChallenge}
                showAnnModal={showAnnModal} setShowAnnModal={setShowAnnModal}
                onDeleteUser={(id) => setUsers(prev => prev.filter(u => u.id !== id))}
                onDeleteChallenge={(id) => setChallenges(prev => prev.filter(c => c.id !== id))}
                onToggleChallenge={(id) => setChallenges(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c))}
                onEditFixture={(f) => setEditFixture(f)}
              />
            )}
          </main>
        </div>
      )}

      {/* Team selection modal */}
      {showTeamModal && (
        <Modal onClose={() => setShowTeamModal(false)} title="Choose Your Team">
          <div style={{ marginBottom: 16 }}>
            <input className="input-field" placeholder="Search team..." value={teamFilter} onChange={e => setTeamFilter(e.target.value)} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 10, maxHeight: 400, overflowY: "auto" }}>
            {TEAMS.filter(t => t.name.toLowerCase().includes(teamFilter.toLowerCase())).map(team => {
              const taken = takenTeams.includes(team.id);
              const isSelected = myUser?.team === team.id;
              return (
                <div key={team.id} className={`team-card ${taken ? "taken" : ""} ${isSelected ? "selected" : ""}`} onClick={() => !taken && !isSelected && selectTeam(team.id)}>
                  <div style={{ fontSize: 32, marginBottom: 6 }}>{team.flag}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: taken ? "#6b7280" : "#e8eaf6" }}>{team.name}</div>
                  <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>Group {team.group}</div>
                  {taken && <div style={{ fontSize: 10, color: "#ef4444", marginTop: 4, fontWeight: 700 }}>TAKEN</div>}
                  {isSelected && <div style={{ fontSize: 10, color: "#10b981", marginTop: 4, fontWeight: 700 }}>YOUR TEAM</div>}
                </div>
              );
            })}
          </div>
        </Modal>
      )}

      {/* Challenge modal */}
      {challengeModal && (
        <Modal onClose={() => setChallengeModal(null)} title={challengeModal.title}>
          <p style={{ color: "#9ca3af", marginBottom: 20 }}>{challengeModal.description}</p>
          <p style={{ color: "#fbbf24", fontWeight: 700, marginBottom: 16 }}>🎯 Earn {challengeModal.points} points</p>
          {hasDoneChallenge(challengeModal.id) ? (
            <div style={{ background: "rgba(16,185,129,0.1)", border: "1px solid #10b981", borderRadius: 10, padding: 16, textAlign: "center" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>✅</div>
              <div style={{ color: "#10b981", fontWeight: 700 }}>Already submitted: {userChallenges[`${currentUser.id}_${challengeModal.id}`]}</div>
            </div>
          ) : (
            <>
              <input className="input-field" placeholder="Your answer..." value={challengeAnswer} onChange={e => setChallengeAnswer(e.target.value)} style={{ marginBottom: 16 }} />
              <button className="btn-primary" style={{ width: "100%" }} onClick={() => submitChallenge(challengeModal.id)}>Submit Answer</button>
            </>
          )}
        </Modal>
      )}

      {/* Fixture edit modal */}
      {editFixture && (
        <EditFixtureModal fixture={editFixture} onSave={updateFixture} onClose={() => setEditFixture(null)} />
      )}
    </div>
  );
}

function LandingPage({ onLogin }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 24, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 30%, rgba(0,100,255,0.15) 0%, transparent 60%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "10%", left: "5%", fontSize: 80, opacity: 0.05, animation: "float 6s ease-in-out infinite" }}>⚽</div>
      <div style={{ position: "absolute", bottom: "10%", right: "5%", fontSize: 80, opacity: 0.05, animation: "float 8s ease-in-out infinite" }}>🏆</div>

      <div style={{ marginBottom: 24, animation: "float 4s ease-in-out infinite" }}>
        <div style={{ fontSize: 80 }}>⚽</div>
      </div>
      <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(28px, 6vw, 56px)", fontWeight: 900, background: "linear-gradient(135deg, #00e5ff, #006eff, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 8, lineHeight: 1.1 }}>
        S2R WORLD CUP 2026
      </div>
      <div style={{ fontSize: 18, color: "#9ca3af", marginBottom: 16, fontWeight: 500 }}>Sell2Rent Internal Fantasy League</div>
      <div style={{ display: "flex", gap: 24, marginBottom: 48, flexWrap: "wrap", justifyContent: "center" }}>
        {[{ emoji: "👥", label: `${INITIAL_USERS.length} Players` }, { emoji: "🌍", label: `${TEAMS.length} Teams` }, { emoji: "🏆", label: "One Champion" }].map(item => (
          <div key={item.label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "12px 20px", fontSize: 15, fontWeight: 600 }}>
            {item.emoji} {item.label}
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, maxWidth: 700, width: "100%", marginBottom: 48 }}>
        {[{ icon: "🏅", title: "Pick Your Team", desc: "Choose one nation, ride their journey" }, { icon: "📊", title: "Earn Points", desc: "Wins, goals & knockouts = points" }, { icon: "🥇", title: "Climb the Board", desc: "Compete with your colleagues" }, { icon: "🎯", title: "Weekly Challenges", desc: "Extra points for top predictions" }].map(f => (
          <div key={f.title} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: 20, textAlign: "left" }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>{f.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{f.title}</div>
            <div style={{ color: "#6b7280", fontSize: 14 }}>{f.desc}</div>
          </div>
        ))}
      </div>
      <button className="btn-primary" style={{ fontSize: 18, padding: "16px 48px", borderRadius: 14 }} onClick={onLogin}>
        Join the Competition →
      </button>
    </div>
  );
}

function LoginPage({ email, setEmail, pass, setPass, error, onLogin, isRegistering, setIsRegistering, regForm, setRegForm, regError, onRegister, onBack }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>⚽</div>
          <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 22, fontWeight: 900, background: "linear-gradient(135deg, #00e5ff, #006eff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>S2R WORLD CUP</div>
        </div>
        <div className="card card-glow" style={{ padding: 32 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
            <button className={`tab ${!isRegistering ? "active" : ""}`} style={{ flex: 1 }} onClick={() => setIsRegistering(false)}>Sign In</button>
            <button className={`tab ${isRegistering ? "active" : ""}`} style={{ flex: 1 }} onClick={() => setIsRegistering(true)}>Register</button>
          </div>
          {!isRegistering ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <input className="input-field" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} type="email" />
              <input className="input-field" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} type="password" onKeyDown={e => e.key === "Enter" && onLogin()} />
              {error && <div style={{ color: "#ef4444", fontSize: 13, fontWeight: 600 }}>{error}</div>}
              <button className="btn-primary" style={{ marginTop: 8 }} onClick={onLogin}>Sign In</button>
              <div style={{ textAlign: "center", fontSize: 12, color: "#6b7280", marginTop: 8 }}>
                Demo: lucia@sell2rent.com / Admin123!
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <input className="input-field" placeholder="Full Name" value={regForm.name} onChange={e => setRegForm(p => ({ ...p, name: e.target.value }))} />
              <input className="input-field" placeholder="Email" value={regForm.email} onChange={e => setRegForm(p => ({ ...p, email: e.target.value }))} type="email" />
              <input className="input-field" placeholder="Password" value={regForm.password} onChange={e => setRegForm(p => ({ ...p, password: e.target.value }))} type="password" />
              {regError && <div style={{ color: "#ef4444", fontSize: 13, fontWeight: 600 }}>{regError}</div>}
              <button className="btn-primary" style={{ marginTop: 8 }} onClick={onRegister}>Create Account</button>
            </div>
          )}
        </div>
        <button className="btn-secondary" style={{ width: "100%", marginTop: 12 }} onClick={onBack}>← Back to Home</button>
      </div>
    </div>
  );
}

function DashboardPage({ currentUser, myTeam, myRank, sortedUsers, fixtures, announcements, challenges, hasDone, onSelectTeam, onChallenge }) {
  const upcomingFixtures = fixtures.filter(f => !f.played).slice(0, 3);
  const recentFixtures = fixtures.filter(f => f.played).slice(0, 3);
  const activeChallenges = challenges.filter(c => c.active).slice(0, 2);

  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      {/* Hero stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: 28 }}>
        <StatCard icon="🏅" label="Your Points" value={currentUser.points} color="#00e5ff" />
        <StatCard icon="📊" label="Your Rank" value={`#${myRank}`} color="#fbbf24" />
        <StatCard icon="⚽" label="Your Team" value={myTeam ? myTeam.name : "—"} color="#10b981" emoji={myTeam?.flag} />
        <StatCard icon="👥" label="Total Players" value={sortedUsers.length} color="#8b5cf6" />
      </div>

      {/* Team selection CTA */}
      {!myTeam && (
        <div style={{ background: "linear-gradient(135deg, rgba(0,229,255,0.1), rgba(0,110,255,0.1))", border: "1px solid rgba(0,229,255,0.3)", borderRadius: 16, padding: 24, marginBottom: 28, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>⚠️ You haven't picked a team yet!</div>
            <div style={{ color: "#9ca3af", fontSize: 14 }}>Choose your national team to start earning points</div>
          </div>
          <button className="btn-primary" onClick={onSelectTeam}>Pick My Team →</button>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 28 }}>
        {/* Mini leaderboard */}
        <div className="card">
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>🏆 Top Rankings</div>
          {sortedUsers.slice(0, 5).map((u, i) => {
            const t = u.team ? getTeam(u.team) : null;
            const isMe = u.id === currentUser.id;
            return (
              <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.05)" : "none", background: isMe ? "rgba(0,229,255,0.05)" : "none", borderRadius: isMe ? 8 : 0, padding: isMe ? "10px 8px" : "10px 0" }}>
                <div style={{ width: 24, textAlign: "center", fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 14, color: i === 0 ? "#fbbf24" : i === 1 ? "#9ca3af" : i === 2 ? "#f97316" : "#6b7280" }}>
                  {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}
                </div>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: getAvatarColor(u.name), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff" }}>{getInitials(u.name)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{u.name.split(" ")[0]} {isMe ? "(You)" : ""}</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>{t ? `${t.flag} ${t.name}` : "No team"}</div>
                </div>
                <div style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700, color: "#00e5ff", fontSize: 15 }}>{u.points}</div>
              </div>
            );
          })}
        </div>

        {/* Announcements */}
        <div className="card">
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>📢 Latest News</div>
          {announcements.slice(0, 4).map(ann => (
            <div key={ann.id} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ fontSize: 20, flexShrink: 0 }}>{ann.type === "match" ? "⚽" : ann.type === "challenge" ? "🎯" : "📣"}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.4 }}>{ann.text}</div>
                <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>{ann.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Upcoming fixtures */}
        <div className="card">
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>📅 Upcoming Matches</div>
          {upcomingFixtures.length === 0 && <div style={{ color: "#6b7280" }}>No upcoming matches</div>}
          {upcomingFixtures.map(f => {
            const h = getTeam(f.home), a = getTeam(f.away);
            return (
              <div key={f.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{h?.flag} {h?.name}</div>
                <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 8, padding: "4px 10px", fontSize: 12, color: "#9ca3af" }}>vs</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{a?.name} {a?.flag}</div>
              </div>
            );
          })}
        </div>

        {/* Active challenges */}
        <div className="card">
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>🎯 Active Challenges</div>
          {activeChallenges.length === 0 && <div style={{ color: "#6b7280" }}>No active challenges</div>}
          {activeChallenges.map(c => (
            <div key={c.id} style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{c.title}</div>
                <span className="badge" style={{ background: "rgba(251,191,36,0.15)", color: "#fbbf24" }}>+{c.points} pts</span>
              </div>
              <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 10 }}>{c.description}</div>
              <button
                className={hasDone(c.id) ? "btn-secondary" : "btn-primary"}
                style={{ padding: "6px 16px", fontSize: 12 }}
                onClick={() => onChallenge(c)}
              >
                {hasDone(c.id) ? "✅ Submitted" : "Answer →"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color, emoji }) {
  return (
    <div className="card" style={{ textAlign: "center", padding: 24 }}>
      <div style={{ fontSize: 28, marginBottom: 8 }}>{emoji || icon}</div>
      <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 24, fontWeight: 900, color, marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: 13, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
    </div>
  );
}

function LeaderboardPage({ sortedUsers, currentUser }) {
  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 28, fontWeight: 900, marginBottom: 8, background: "linear-gradient(135deg, #fbbf24, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>🏆 LEADERBOARD</div>
      <div style={{ color: "#6b7280", marginBottom: 28 }}>Official S2R World Cup 2026 Rankings</div>

      {/* Top 3 podium */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 32, maxWidth: 600 }}>
        {[sortedUsers[1], sortedUsers[0], sortedUsers[2]].map((u, podiumIdx) => {
          if (!u) return <div key={podiumIdx} />;
          const rank = podiumIdx === 1 ? 1 : podiumIdx === 0 ? 2 : 3;
          const t = u.team ? getTeam(u.team) : null;
          const colors = { 1: "#fbbf24", 2: "#9ca3af", 3: "#f97316" };
          const medals = { 1: "🥇", 2: "🥈", 3: "🥉" };
          const sizes = { 1: 80, 2: 64, 3: 64 };
          return (
            <div key={u.id} style={{ textAlign: "center", padding: "20px 12px", background: `rgba(${rank === 1 ? "251,191,36" : rank === 2 ? "156,163,175" : "249,115,22"},0.08)`, border: `1px solid ${colors[rank]}33`, borderRadius: 16, transform: rank === 1 ? "translateY(-12px)" : "none" }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{medals[rank]}</div>
              <div style={{ width: sizes[rank], height: sizes[rank], borderRadius: "50%", background: getAvatarColor(u.name), display: "flex", alignItems: "center", justifyContent: "center", fontSize: rank === 1 ? 22 : 16, fontWeight: 700, color: "#fff", margin: "0 auto 10px", border: `3px solid ${colors[rank]}` }}>{getInitials(u.name)}</div>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{u.name.split(" ")[0]}</div>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{t?.flag || "🏳️"}</div>
              <div style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, color: colors[rank], fontSize: 18 }}>{u.points}</div>
            </div>
          );
        })}
      </div>

      {/* Full table */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.04)" }}>
              {["Rank", "Player", "Team", "Points", "Status"].map(h => (
                <th key={h} style={{ padding: "14px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "#6b7280", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((u, i) => {
              const t = u.team ? getTeam(u.team) : null;
              const isMe = u.id === currentUser.id;
              return (
                <tr key={u.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: isMe ? "rgba(0,229,255,0.05)" : "none", transition: "background 0.2s" }}>
                  <td style={{ padding: "14px 20px", fontFamily: "'Orbitron', sans-serif", fontWeight: 900, color: i === 0 ? "#fbbf24" : i === 1 ? "#9ca3af" : i === 2 ? "#f97316" : "#6b7280", fontSize: 14 }}>
                    {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: "50%", background: getAvatarColor(u.name), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff" }}>{getInitials(u.name)}</div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{u.name} {isMe && <span style={{ fontSize: 11, color: "#00e5ff" }}>(You)</span>}</div>
                        <div style={{ fontSize: 12, color: "#6b7280" }}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "14px 20px", fontSize: 15 }}>{t ? `${t.flag} ${t.name}` : <span style={{ color: "#6b7280" }}>No team</span>}</td>
                  <td style={{ padding: "14px 20px" }}>
                    <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, color: "#00e5ff", fontSize: 16 }}>{u.points}</span>
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <span className="badge" style={{ background: "rgba(16,185,129,0.15)", color: "#10b981" }}>Active</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FixturesPage({ fixtures, isAdmin, onEdit }) {
  const [filter, setFilter] = useState("all");
  const played = fixtures.filter(f => f.played);
  const upcoming = fixtures.filter(f => !f.played);
  const shown = filter === "played" ? played : filter === "upcoming" ? upcoming : fixtures;

  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 28, fontWeight: 900, marginBottom: 8, color: "#00e5ff" }}>📅 FIXTURES & RESULTS</div>
      <div style={{ color: "#6b7280", marginBottom: 24 }}>World Cup 2026 Match Schedule</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {["all", "played", "upcoming"].map(f => (
          <button key={f} className={`tab ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)} style={{ textTransform: "capitalize" }}>{f}</button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {shown.map(f => {
          const h = getTeam(f.home), a = getTeam(f.away);
          return (
            <div key={f.id} className="card" style={{ display: "flex", alignItems: "center", gap: 20, padding: "16px 24px", flexWrap: "wrap" }}>
              <div style={{ flex: 1, textAlign: "right", minWidth: 120 }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>{h?.flag}</div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{h?.name}</div>
              </div>
              <div style={{ textAlign: "center", minWidth: 100 }}>
                {f.played ? (
                  <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 28, fontWeight: 900, color: "#00e5ff" }}>{f.homeScore} – {f.awayScore}</div>
                ) : (
                  <div>
                    <div style={{ fontSize: 18, color: "#6b7280", fontWeight: 700 }}>VS</div>
                    <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 4 }}>{f.date}</div>
                  </div>
                )}
                <span className="badge" style={{ marginTop: 6, background: f.played ? "rgba(16,185,129,0.15)" : "rgba(251,191,36,0.15)", color: f.played ? "#10b981" : "#fbbf24" }}>
                  {f.played ? "Final" : "Upcoming"}
                </span>
                <div style={{ fontSize: 11, color: "#6b7280", marginTop: 4 }}>Group {f.group}</div>
              </div>
              <div style={{ flex: 1, textAlign: "left", minWidth: 120 }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>{a?.flag}</div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{a?.name}</div>
              </div>
              {isAdmin && (
                <button className="btn-secondary" style={{ padding: "6px 14px", fontSize: 12 }} onClick={() => onEdit(f)}>
                  ✏️ Edit
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ChallengesPage({ challenges, hasDone, onChallenge }) {
  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 28, fontWeight: 900, marginBottom: 8, color: "#8b5cf6" }}>🎯 CHALLENGES</div>
      <div style={{ color: "#6b7280", marginBottom: 28 }}>Answer correctly to earn bonus points!</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
        {challenges.map(c => (
          <div key={c.id} className="card" style={{ borderColor: c.active ? "rgba(139,92,246,0.3)" : "rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span className="badge" style={{ background: c.active ? "rgba(139,92,246,0.15)" : "rgba(107,114,128,0.15)", color: c.active ? "#8b5cf6" : "#6b7280" }}>
                {c.active ? "Active" : "Closed"}
              </span>
              <span className="badge" style={{ background: "rgba(251,191,36,0.15)", color: "#fbbf24" }}>+{c.points} pts</span>
            </div>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{c.title}</div>
            <div style={{ color: "#9ca3af", fontSize: 14, marginBottom: 16 }}>{c.description}</div>
            {c.deadline && <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 16 }}>⏰ Deadline: {c.deadline}</div>}
            {c.active && (
              <button
                className={hasDone(c.id) ? "btn-secondary" : "btn-primary"}
                style={{ width: "100%" }}
                onClick={() => onChallenge(c)}
              >
                {hasDone(c.id) ? "✅ Submitted" : "Submit Answer →"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminPage({ users, challenges, announcements, fixtures, adminTab, setAdminTab, editPointsUser, setEditPointsUser, editPointsVal, setEditPointsVal, onUpdatePoints, newAnnouncement, setNewAnnouncement, onPostAnn, newChallenge, setNewChallenge, onAddChallenge, showAnnModal, setShowAnnModal, onDeleteUser, onDeleteChallenge, onToggleChallenge, onEditFixture }) {
  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 28, fontWeight: 900, marginBottom: 8, color: "#ef4444" }}>⚙️ ADMIN PANEL</div>
      <div style={{ color: "#6b7280", marginBottom: 24 }}>Manage the S2R World Cup 2026</div>

      <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
        {["users", "points", "announcements", "challenges", "fixtures"].map(t => (
          <button key={t} className={`tab ${adminTab === t ? "active" : ""}`} onClick={() => setAdminTab(t)} style={{ textTransform: "capitalize" }}>{t}</button>
        ))}
      </div>

      {adminTab === "users" && (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                {["Player", "Email", "Role", "Team", "Points", "Joined", "Actions"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "#6b7280", borderBottom: "1px solid rgba(255,255,255,0.06)", textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map(u => {
                const t = u.team ? getTeam(u.team) : null;
                return (
                  <tr key={u.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 30, height: 30, borderRadius: "50%", background: getAvatarColor(u.name), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>{getInitials(u.name)}</div>
                        <span style={{ fontSize: 14, fontWeight: 600 }}>{u.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "#9ca3af" }}>{u.email}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span className="badge" style={{ background: u.role === "admin" ? "rgba(239,68,68,0.15)" : "rgba(16,185,129,0.15)", color: u.role === "admin" ? "#ef4444" : "#10b981" }}>{u.role}</span>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 14 }}>{t ? `${t.flag} ${t.name}` : "—"}</td>
                    <td style={{ padding: "12px 16px", fontFamily: "'Orbitron', sans-serif", fontWeight: 700, color: "#00e5ff" }}>{u.points}</td>
                    <td style={{ padding: "12px 16px", fontSize: 12, color: "#6b7280" }}>{u.joined}</td>
                    <td style={{ padding: "12px 16px" }}>
                      {u.role !== "admin" && (
                        <button className="btn-secondary" style={{ padding: "4px 10px", fontSize: 12, color: "#ef4444" }} onClick={() => onDeleteUser(u.id)}>Remove</button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {adminTab === "points" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {users.map(u => {
            const isEditing = editPointsUser === u.id;
            return (
              <div key={u.id} className="card">
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: getAvatarColor(u.name), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff" }}>{getInitials(u.name)}</div>
                  <div>
                    <div style={{ fontWeight: 700 }}>{u.name}</div>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>{u.team ? getTeam(u.team)?.name : "No team"}</div>
                  </div>
                </div>
                {isEditing ? (
                  <div style={{ display: "flex", gap: 8 }}>
                    <input className="input-field" type="number" value={editPointsVal} onChange={e => setEditPointsVal(e.target.value)} style={{ width: 80 }} />
                    <button className="btn-primary" style={{ padding: "8px 14px", fontSize: 12 }} onClick={() => onUpdatePoints(u.id, editPointsVal)}>Save</button>
                    <button className="btn-secondary" style={{ padding: "8px 12px", fontSize: 12 }} onClick={() => setEditPointsUser(null)}>✕</button>
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 22, fontWeight: 900, color: "#00e5ff" }}>{u.points} pts</span>
                    <button className="btn-secondary" style={{ padding: "6px 14px", fontSize: 12 }} onClick={() => { setEditPointsUser(u.id); setEditPointsVal(u.points); }}>Edit</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {adminTab === "announcements" && (
        <div>
          <div className="card" style={{ marginBottom: 20 }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Post Announcement</div>
            <textarea className="input-field" value={newAnnouncement} onChange={e => setNewAnnouncement(e.target.value)} placeholder="Type announcement..." rows={3} style={{ resize: "vertical", marginBottom: 12 }} />
            <button className="btn-primary" onClick={onPostAnn}>Post →</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {announcements.map(ann => (
              <div key={ann.id} className="card" style={{ display: "flex", gap: 12, padding: 16 }}>
                <div style={{ fontSize: 24 }}>{ann.type === "match" ? "⚽" : ann.type === "challenge" ? "🎯" : "📣"}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 500 }}>{ann.text}</div>
                  <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>{ann.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {adminTab === "challenges" && (
        <div>
          <div className="card" style={{ marginBottom: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Create Challenge</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <input className="input-field" placeholder="Title" value={newChallenge.title} onChange={e => setNewChallenge(p => ({ ...p, title: e.target.value }))} />
              <input className="input-field" type="number" placeholder="Points" value={newChallenge.points} onChange={e => setNewChallenge(p => ({ ...p, points: Number(e.target.value) }))} />
            </div>
            <input className="input-field" placeholder="Description" value={newChallenge.description} onChange={e => setNewChallenge(p => ({ ...p, description: e.target.value }))} style={{ marginBottom: 14 }} />
            <input className="input-field" type="date" value={newChallenge.deadline} onChange={e => setNewChallenge(p => ({ ...p, deadline: e.target.value }))} style={{ marginBottom: 14 }} />
            <button className="btn-primary" onClick={onAddChallenge}>Create Challenge →</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
            {challenges.map(c => (
              <div key={c.id} className="card">
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span className="badge" style={{ background: c.active ? "rgba(16,185,129,0.15)" : "rgba(107,114,128,0.15)", color: c.active ? "#10b981" : "#6b7280" }}>{c.active ? "Active" : "Closed"}</span>
                  <span className="badge" style={{ background: "rgba(251,191,36,0.15)", color: "#fbbf24" }}>+{c.points} pts</span>
                </div>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>{c.title}</div>
                <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 14 }}>{c.description}</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn-secondary" style={{ flex: 1, fontSize: 12, padding: "6px 10px" }} onClick={() => onToggleChallenge(c.id)}>{c.active ? "Deactivate" : "Activate"}</button>
                  <button className="btn-secondary" style={{ padding: "6px 12px", fontSize: 12, color: "#ef4444" }} onClick={() => onDeleteChallenge(c.id)}>✕</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {adminTab === "fixtures" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {fixtures.map(f => {
            const h = getTeam(f.home), a = getTeam(f.away);
            return (
              <div key={f.id} className="card" style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                <div style={{ flex: 1, fontWeight: 600, fontSize: 14 }}>{h?.flag} {h?.name}</div>
                <div style={{ textAlign: "center", minWidth: 80 }}>
                  {f.played ? (
                    <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, color: "#00e5ff" }}>{f.homeScore}–{f.awayScore}</span>
                  ) : (
                    <span style={{ color: "#6b7280" }}>TBD</span>
                  )}
                </div>
                <div style={{ flex: 1, fontWeight: 600, fontSize: 14, textAlign: "right" }}>{a?.name} {a?.flag}</div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>{f.date}</div>
                <button className="btn-secondary" style={{ padding: "6px 14px", fontSize: 12 }} onClick={() => onEditFixture(f)}>✏️ Edit Score</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Modal({ onClose, title, children }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 32, maxWidth: 560, width: "100%", maxHeight: "90vh", overflowY: "auto", animation: "fadeIn 0.2s ease" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 18, color: "#00e5ff" }}>{title}</div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#9ca3af", fontSize: 20, cursor: "pointer", lineHeight: 1 }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function EditFixtureModal({ fixture, onSave, onClose }) {
  const [home, setHome] = useState(fixture.homeScore ?? 0);
  const [away, setAway] = useState(fixture.awayScore ?? 0);
  const h = getTeam(fixture.home), a = getTeam(fixture.away);
  return (
    <Modal onClose={onClose} title="Update Match Result">
      <div style={{ textAlign: "center", marginBottom: 24, fontSize: 18, fontWeight: 700 }}>{h?.flag} {h?.name} vs {a?.name} {a?.flag}</div>
      <div style={{ display: "flex", gap: 16, alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>{h?.name}</div>
          <input className="input-field" type="number" min="0" value={home} onChange={e => setHome(e.target.value)} style={{ width: 80, textAlign: "center", fontSize: 24, fontFamily: "'Orbitron', sans-serif" }} />
        </div>
        <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 28, color: "#6b7280" }}>–</div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>{a?.name}</div>
          <input className="input-field" type="number" min="0" value={away} onChange={e => setAway(e.target.value)} style={{ width: 80, textAlign: "center", fontSize: 24, fontFamily: "'Orbitron', sans-serif" }} />
        </div>
      </div>
      <button className="btn-primary" style={{ width: "100%" }} onClick={() => onSave(fixture.id, home, away)}>Save Result</button>
    </Modal>
  );
}

function ConfettiEffect() {
  const colors = ["#00e5ff", "#fbbf24", "#10b981", "#8b5cf6", "#ef4444", "#f97316"];
  const pieces = Array.from({ length: 40 });
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9998, overflow: "hidden" }}>
      {pieces.map((_, i) => (
        <div key={i} style={{
          position: "absolute", top: -20,
          left: `${Math.random() * 100}%`,
          width: 8, height: 8,
          borderRadius: Math.random() > 0.5 ? "50%" : 0,
          background: colors[Math.floor(Math.random() * colors.length)],
          animation: `confettiFall ${2 + Math.random() * 2}s ${Math.random() * 1}s ease-in forwards`
        }} />
      ))}
    </div>
  );
}
