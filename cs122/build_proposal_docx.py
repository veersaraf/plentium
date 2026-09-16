#!/usr/bin/env python3
"""Build the Frontier Facts CS 122 proposal as a print-ready .docx."""

from docx import Document
from docx.enum.table import WD_CELL_VERTICAL_ALIGNMENT, WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
from docx.oxml import OxmlElement
from docx.oxml.ns import qn, nsmap
from docx.shared import Cm, Inches, Pt, RGBColor, Twips

INK = RGBColor(0x1C, 0x1B, 0x19)
STONE = RGBColor(0x6E, 0x69, 0x63)
TEAL = RGBColor(0x04, 0x2F, 0x2E)
CREAM = RGBColor(0xF4, 0xF4, 0xE4)
RULE = "042F2E"
CREAM_HEX = "F4F4E4"
TEAL_HEX = "042F2E"
ROW_ALT = "F7F4EC"

OUT = "/workspace/cs122/Frontier_Facts_Project_Proposal.docx"


def set_run_font(run, name, size=None, bold=None, italic=None, color=None, caps=False, spacing=None):
    run.font.name = name
    r = run._element
    rPr = r.get_or_add_rPr()
    rFonts = rPr.find(qn("w:rFonts"))
    if rFonts is None:
        rFonts = OxmlElement("w:rFonts")
        rPr.append(rFonts)
    rFonts.set(qn("w:ascii"), name)
    rFonts.set(qn("w:hAnsi"), name)
    rFonts.set(qn("w:eastAsia"), name)
    rFonts.set(qn("w:cs"), name)
    if size is not None:
        run.font.size = Pt(size)
    if bold is not None:
        run.font.bold = bold
    if italic is not None:
        run.font.italic = italic
    if color is not None:
        run.font.color.rgb = color
    if caps:
        rPr.append(OxmlElement("w:caps"))
    if spacing is not None:
        spc = OxmlElement("w:spacing")
        spc.set(qn("w:val"), str(spacing))
        rPr.append(spc)


def shade_paragraph(paragraph, hex_color):
    pPr = paragraph._p.get_or_add_pPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"), hex_color)
    pPr.append(shd)


def set_paragraph_border(paragraph, **sides):
    """sides: top/bottom/left/right -> (sz, color, space)"""
    pPr = paragraph._p.get_or_add_pPr()
    pBdr = OxmlElement("w:pBdr")
    for edge, (sz, color, space) in sides.items():
        el = OxmlElement(f"w:{edge}")
        el.set(qn("w:val"), "single")
        el.set(qn("w:sz"), str(sz))
        el.set(qn("w:space"), str(space))
        el.set(qn("w:color"), color)
        pBdr.append(el)
    pPr.append(pBdr)


def set_cell_shading(cell, hex_color):
    tc = cell._tc
    tcPr = tc.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"), hex_color)
    tcPr.append(shd)


def set_cell_margins(cell, top=80, bottom=80, left=120, right=120):
    tc = cell._tc
    tcPr = tc.get_or_add_tcPr()
    tcMar = OxmlElement("w:tcMar")
    for edge, val in (("top", top), ("left", left), ("bottom", bottom), ("right", right)):
        node = OxmlElement(f"w:{edge}")
        node.set(qn("w:w"), str(val))
        node.set(qn("w:type"), "dxa")
        tcMar.append(node)
    tcPr.append(tcMar)


def set_table_borders(table, color="FFFFFF", sz="0"):
    tbl = table._tbl
    tblPr = tbl.tblPr
    borders = OxmlElement("w:tblBorders")
    for edge in ("top", "left", "bottom", "right", "insideH", "insideV"):
        el = OxmlElement(f"w:{edge}")
        el.set(qn("w:val"), "single" if int(sz) else "nil")
        el.set(qn("w:sz"), sz)
        el.set(qn("w:space"), "0")
        el.set(qn("w:color"), color)
        borders.append(el)
    tblPr.append(borders)


def set_keep_with_next(paragraph):
    pPr = paragraph._p.get_or_add_pPr()
    k = OxmlElement("w:keepNext")
    pPr.append(k)


def add_text(p, text, **kwargs):
    run = p.add_run(text)
    set_run_font(run, **kwargs)
    return run


def label_line(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(18)
    p.paragraph_format.space_after = Pt(8)
    p.paragraph_format.line_spacing = 1.0
    add_text(p, text, name="Calibri", size=10, bold=True, color=TEAL, caps=True, spacing=180)
    set_paragraph_border(p, bottom=("12", RULE, "4"))
    set_keep_with_next(p)
    return p


def field(doc, k, v, space_before=4):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(space_before)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.line_spacing = 1.15
    add_text(p, k + "  ", name="Calibri", size=10, bold=True, color=STONE, caps=True, spacing=60)
    add_text(p, v, name="Georgia", size=11, color=INK)
    return p


def body(doc, text, space_before=6, space_after=8, italic=False):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(space_before)
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.line_spacing = 1.2
    add_text(p, text, name="Georgia", size=11, italic=italic, color=INK)
    return p


def bullet(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.left_indent = Inches(0.2)
    p.paragraph_format.space_before = Pt(1)
    p.paragraph_format.space_after = Pt(3)
    p.paragraph_format.line_spacing = 1.15
    add_text(p, "–  ", name="Calibri", size=11, color=TEAL)
    add_text(p, text, name="Georgia", size=11, color=INK)
    return p


def cell_text(cell, text, *, name="Georgia", size=10, bold=False, color=INK, caps=False, align="left"):
    cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
    p = cell.paragraphs[0]
    p.clear()
    if align == "center":
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(3)
    p.paragraph_format.space_after = Pt(3)
    add_text(p, text, name=name, size=size, bold=bold, color=color, caps=caps, spacing=40 if caps else None)


def build():
    doc = Document()
    section = doc.sections[0]
    section.page_width = Inches(8.5)
    section.page_height = Inches(11)
    section.top_margin = Inches(0.75)
    section.bottom_margin = Inches(0.8)
    section.left_margin = Inches(0.95)
    section.right_margin = Inches(0.95)

    # Header
    hp = section.header.paragraphs[0]
    hp.alignment = WD_ALIGN_PARAGRAPH.LEFT
    add_text(hp, "FRONTIER FACTS", name="Calibri", size=8, bold=True, color=TEAL, caps=True, spacing=140)
    add_text(hp, "    ·    CS 122-04    ·    FALL 2026", name="Calibri", size=8, color=STONE, spacing=80)
    set_paragraph_border(hp, bottom=("8", RULE, "6"))

    fp = section.footer.paragraphs[0]
    fp.alignment = WD_ALIGN_PARAGRAPH.LEFT
    add_text(fp, "SAN JOSÉ STATE UNIVERSITY", name="Calibri", size=8, color=STONE, caps=True, spacing=100)
    add_text(fp, "          Project Assignment #1          ", name="Calibri", size=8, color=STONE)
    add_text(fp, "PAGE ", name="Calibri", size=8, color=STONE, caps=True, spacing=60)
    # PAGE field
    run = fp.add_run()
    fld_begin = OxmlElement("w:fldChar")
    fld_begin.set(qn("w:fldCharType"), "begin")
    instr = OxmlElement("w:instrText")
    instr.set(qn("xml:space"), "preserve")
    instr.text = " PAGE "
    fld_sep = OxmlElement("w:fldChar")
    fld_sep.set(qn("w:fldCharType"), "separate")
    fld_end = OxmlElement("w:fldChar")
    fld_end.set(qn("w:fldCharType"), "end")
    run._r.append(fld_begin)
    run._r.append(instr)
    run._r.append(fld_sep)
    run._r.append(fld_end)
    set_paragraph_border(fp, top=("8", RULE, "8"))

    # Masthead
    kicker = doc.add_paragraph()
    kicker.alignment = WD_ALIGN_PARAGRAPH.LEFT
    kicker.paragraph_format.space_before = Pt(4)
    kicker.paragraph_format.space_after = Pt(2)
    add_text(kicker, "PROJECT ASSIGNMENT  #1", name="Calibri", size=9, bold=True, color=TEAL, caps=True, spacing=180)

    title = doc.add_paragraph()
    title.paragraph_format.space_before = Pt(0)
    title.paragraph_format.space_after = Pt(2)
    title.paragraph_format.line_spacing = 0.95
    add_text(title, "Frontier Facts", name="Georgia", size=32, bold=False, color=TEAL)

    sub = doc.add_paragraph()
    sub.paragraph_format.space_before = Pt(0)
    sub.paragraph_format.space_after = Pt(10)
    add_text(sub, "Project Proposal  ·  Advanced Programming with Python", name="Calibri", size=11, color=STONE)

    # Motto band
    motto = doc.add_paragraph()
    motto.paragraph_format.space_before = Pt(4)
    motto.paragraph_format.space_after = Pt(6)
    motto.paragraph_format.left_indent = Cm(0.35)
    motto.paragraph_format.right_indent = Cm(0.2)
    motto.paragraph_format.line_spacing = 1.25
    shade_paragraph(motto, CREAM_HEX)
    set_paragraph_border(motto, left=("24", RULE, "10"))
    add_text(
        motto,
        "A positive, unified, and factual way to look at humanity’s frontier technologies — the ones carrying us toward a world of abundance.",
        name="Georgia",
        size=12,
        italic=True,
        color=INK,
    )

    # TEAM
    label_line(doc, "01    Team")
    field(doc, "Team name", "Frontier Facts", space_before=8)
    field(doc, "Members", "Veer Saraf     ·     [Name]     ·     [Name]")
    field(doc, "Motto", "The line above. That is the whole point of the project.")

    # DATA
    label_line(doc, "02    Dataset")
    body(
        doc,
        "We are using two public, free datasets. The large one is Ember’s monthly electricity file. The smaller one is Our World in Data’s yearly energy file, which adds population and GDP.",
        space_before=8,
        space_after=10,
    )

    table = doc.add_table(rows=6, cols=3)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = True
    headers = ["", "Ember  ·  main", "Our World in Data  ·  supporting"]
    rows = [
        ("What it is", "Monthly electricity by fuel", "Yearly energy, population, GDP"),
        ("Size", "About 515,000 rows  ·  67 MB", "About 23,000 rows  ·  9 MB"),
        ("Coverage", "About 100 countries, 1999–2026", "300+ countries, 1900–2025"),
        ("Why we need it", "Large enough for the class. Lets us watch nuclear, solar, and wind rise month by month.", "Lets us ask whether countries that use more energy also look better off."),
        ("Link", "ember-energy.org/data/monthly-electricity-data", "github.com/owid/energy-data"),
    ]
    for i, text in enumerate(headers):
        cell = table.rows[0].cells[i]
        set_cell_shading(cell, TEAL_HEX)
        set_cell_margins(cell, 90, 80, 110, 110)
        cell_text(cell, text, name="Calibri", size=9, bold=True, color=CREAM, caps=True)
    for r, row in enumerate(rows, start=1):
        for c, text in enumerate(row):
            cell = table.rows[r].cells[c]
            set_cell_shading(cell, CREAM_HEX if r % 2 else "FFFFFF")
            set_cell_margins(cell, 90, 80, 110, 110)
            if c == 0:
                cell_text(cell, text, name="Calibri", size=9, bold=True, color=TEAL, caps=True)
            else:
                cell_text(cell, text, name="Georgia", size=10, color=INK)
    set_table_borders(table, color="E4DFD4", sz="4")

    # Make first column narrower-ish via widths
    for row in table.rows:
        row.cells[0].width = Inches(1.35)
        row.cells[1].width = Inches(2.85)
        row.cells[2].width = Inches(2.85)

    body(
        doc,
        "Ember file (direct):  storage.googleapis.com/emb-prod-bkt-publicdata/public-downloads/monthly_full_release_long_format.csv",
        space_before=10,
        space_after=4,
    )
    body(
        doc,
        "Each Ember row is one country, one month, and one number — electricity from nuclear, solar, wind, coal, or gas, plus demand and emissions. We will not put the files in GitHub. The repo will only have download instructions.",
        space_before=2,
        space_after=6,
    )

    # VISION
    label_line(doc, "03    Vision")
    field(doc, "Question", "Is the world moving toward a world of abundance? Are people getting more electricity, and is more of it coming from nuclear, solar, and wind?", space_before=8)
    field(
        doc,
        "Goal",
        "A Python program that loads this data, cleans it, and lets someone pick a country and see the story in simple charts.",
    )
    field(
        doc,
        "Users",
        "Classmates, and anyone who wants a clear look at energy progress without the usual doom-and-gloom framing.",
    )

    # REPO
    label_line(doc, "04    Repository")
    field(doc, "Repo name", "frontier-facts-ember-energy", space_before=8)
    field(doc, "Link", "https://github.com/CS122-04-FA26/frontier-facts-ember-energy")
    body(doc, "Create this under the CS 122 GitHub organization. Naming follows teamname-dataset-theme.", space_before=4, space_after=8)

    repo = doc.add_table(rows=6, cols=2)
    repo.alignment = WD_TABLE_ALIGNMENT.CENTER
    files = [
        ("README.md", "Project title, team, datasets"),
        ("data/", "Download instructions only — no raw files"),
        ("notebooks/", "Exploratory analysis, to be added"),
        ("src/", "Python source, to be added"),
        (".gitignore", "Ignore data files, virtualenv, secrets"),
    ]
    h0, h1 = repo.rows[0].cells
    set_cell_shading(h0, TEAL_HEX)
    set_cell_shading(h1, TEAL_HEX)
    set_cell_margins(h0, 80, 70, 110, 110)
    set_cell_margins(h1, 80, 70, 110, 110)
    cell_text(h0, "File", name="Calibri", size=9, bold=True, color=CREAM, caps=True)
    cell_text(h1, "What it is for", name="Calibri", size=9, bold=True, color=CREAM, caps=True)
    for i, (a, b) in enumerate(files, start=1):
        c0, c1 = repo.rows[i].cells
        set_cell_shading(c0, CREAM_HEX if i % 2 else "FFFFFF")
        set_cell_shading(c1, CREAM_HEX if i % 2 else "FFFFFF")
        set_cell_margins(c0, 70, 60, 110, 110)
        set_cell_margins(c1, 70, 60, 110, 110)
        cell_text(c0, a, name="Calibri", size=10, bold=True, color=TEAL)
        cell_text(c1, b, name="Georgia", size=10, color=INK)
    set_table_borders(repo, color="E4DFD4", sz="4")
    for row in repo.rows:
        row.cells[0].width = Inches(2.1)
        row.cells[1].width = Inches(4.95)

    doc.save(OUT)
    print("wrote", OUT)


if __name__ == "__main__":
    build()
