import { useState } from "react";
import "./newInstitution.scss";

function RecordExperience() {
  const [saving, setSaving] = useState(false);

  function changeFile(arg0: File | undefined): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <h2 className="h">Record User Experience</h2>

      <div className="form" style={{ opacity: saving ? 0.5 : 1 }}>
        <div className="form-row">
          <div className="form-label">
            User ID: <br />{" "}
          </div>
          <div className="form-input">
            <input type="text" placeholder="Enter User ID " />
          </div>
        </div>

        <div className="form-footer">
          <button
            className="form-button"
            onClick={RecordExperience}
            disabled={saving}
          >
            Check Details
          </button>
        </div>
      </div>
    </>
  );
}

export default RecordExperience;
