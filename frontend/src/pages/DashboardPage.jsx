function DashboardPage({ user, response, onLogout, onApiCall }) {
  const canViewAdmin = user.role === "ADMIN";
  const isSignedIn = Boolean(user.role);

  return (
    <>
      <section className="card">
        <div className="dashboard-header">
          <div>
            <h2>Dashboard Page</h2>
            <p>Access role-based content and call protected backend APIs.</p>
          </div>
          <button className="primary-button" type="button" onClick={onLogout}>
            Logout
          </button>
        </div>

        {isSignedIn ? (
          <div className="profile-summary">
            <div>
              <strong>User:</strong> {user.email}
            </div>
            <div>
              <strong>Role:</strong> {user.role}
            </div>
          </div>
        ) : (
          <p>Please log in to see role-based content cards.</p>
        )}
      </section>

      <section className="dashboard-grid">
        <article className="card role-card">
          <h3>User Content Card</h3>
          <p>Visible to any authenticated user with the USER or ADMIN role.</p>
          <ul>
            <li>Access /api/user content</li>
            <li>View protected user section</li>
          </ul>
          <button
            className="primary-button"
            type="button"
            onClick={() => onApiCall("/api/user", true)}
            disabled={!isSignedIn}
          >
            Fetch User Content
          </button>
        </article>

        <article
          className={`card role-card ${canViewAdmin ? "" : "locked-card"}`}
        >
          <h3>Admin Content Card</h3>
          {canViewAdmin ? (
            <>
              <p>Visible only to users with the ADMIN role.</p>
              <ul>
                <li>Access /api/admin content</li>
                <li>Manage administrative resources</li>
              </ul>
              <button
                className="primary-button"
                type="button"
                onClick={() => onApiCall("/api/admin", true)}
              >
                Fetch Admin Content
              </button>
            </>
          ) : (
            <>
              <p>
                This section is locked. Only admin users can view admin content.
              </p>
              <button className="primary-button" type="button" disabled>
                Admin Locked
              </button>
            </>
          )}
        </article>
      </section>

      <section className="card response-card">
        <h2>Server Response</h2>
        <pre>{response}</pre>
      </section>
    </>
  );
}

export default DashboardPage;
