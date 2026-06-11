# Test cases for import

Import-ready files for each TMS, generated from the Testomat.io export
(`TOMAT dump at 2026-06-07 10-41-50 UTC.csv`, 27 test cases). Each file is
shaped to that system's native CSV importer.

| File                        | Target system | Delimiter | Folder column            | Folder separator |
| --------------------------- | ------------- | --------- | ------------------------ | ---------------- |
| `testomatio-import.csv`     | Testomat.io   | `;`       | `Folder`                 | `/`              |
| `testrail-import.csv`       | TestRail      | `,`       | `Section`                | `>`              |
| `xray-import.csv`           | Xray (Jira)   | `,`       | `Test Repository Path`   | `/`              |
| `zephyr-scale-import.csv`   | Zephyr Scale  | `,`       | `Folder`                 | `/`              |
| `qasphere-import.csv`       | QA Sphere     | `,`       | `Folder`                 | `/`              |

## Field mapping (from the source dump)

| Source field   | Testomat.io | TestRail     | Xray             | Zephyr Scale | QA Sphere   |
| -------------- | ----------- | ------------ | ---------------- | ------------ | ----------- |
| `Title`        | `Title`     | `Title`      | `Summary`        | `Name`       | `Name`      |
| `Folder`       | `Folder`    | `Section`    | `Test Repository Path` | `Folder` | `Folder`  |
| `Priority` (normal) | `normal` | `Medium`   | `Medium`         | `Normal`     | `medium`    |
| `ID` (Txxxx)   | `ID`        | `References` | `TCID`           | — (in title) | `Legacy ID` |
| `Status` (automated/manual) | `Status` | `Type` | `Labels`     | `Labels`     | `Tags`      |

The source has no steps/preconditions, so those columns are left empty and ready
to fill in. The `/testomat/` prefix from the source folders is dropped; the top
folders are title-cased (`content` -> `Content`, `home-page` -> `Home Page`,
`navigation` -> `Navigation`).

## How to import each file

### Testomat.io
Native export schema — re-importable as-is. Project **Settings -> Import -> CSV**,
keep the `;` delimiter.

### TestRail
**Test Cases -> Import -> CSV**. Template: **Test Case (Steps)**, delimiter `,`,
header row on. Map `Section` with hierarchy enabled using `>` as the separator.
Map `Type`/`Priority` values during the value-mapping step (create an `Automated`
type value if needed). `References` carries the original Testomat ID.

### Xray (Jira)
**Apps -> Xray -> Test Case Importer -> CSV**. Map the three mandatory fields:
`TCID` -> Test Case Identifier, `Summary` -> Summary, `Test Type` -> Test Type.
Map `Test Repository Path` -> Test Repository Path and enable **Create Folders**
on the setup page. `Action`/`Data`/`Result` are the (empty) manual-step columns.

### Zephyr Scale
**Test Cases -> Import -> Import from CSV (Step-by-Step)**, delimiter `,`. `Name`
is mandatory; `Folder` paths (with `/`) create folders automatically. Map
`Priority`/`Status`/`Labels` values when prompted. Leave `Step`/`Expected
Result`/`Test Data` for later.

### QA Sphere
**Test Cases tab -> (＋) -> Import**. Select `,` separator and the destination
directory. `Folder` + `Name` are required; `Legacy ID` preserves the Testomat ID.
`Step 1`/`Expected 1` columns are present and empty, ready to fill.
