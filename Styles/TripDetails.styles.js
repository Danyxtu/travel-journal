import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    overflow: "hidden",
  },
  headerContent: {
    zIndex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  headerInfo: {
    alignItems: "center",
  },
  headerEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 6,
  },
  headerDate: {
    fontSize: 15,
    color: "rgba(255,255,255,0.9)",
    marginBottom: 20,
  },
  headerStats: {
    flexDirection: "row",
    gap: 20,
  },
  headerStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  headerStatText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "600",
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  decorativeCircle1: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(255,255,255,0.1)",
    top: -50,
    right: -50,
  },
  decorativeCircle2: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.08)",
    bottom: -30,
    left: -30,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  photosContainer: {
    paddingRight: 20,
  },
  photoCard: {
    width: width * 0.7,
    height: 220,
    borderRadius: 16,
    marginRight: 12,
    overflow: "hidden",
    backgroundColor: "#E0E0E0",
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  photoOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  photoCaption: {
    fontSize: 14,
    color: "#FFF",
    fontWeight: "600",
  },
  addPhotoCard: {
    width: width * 0.5,
    height: 220,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    gap: 8,
  },
  addPhotoText: {
    fontSize: 14,
    color: "#999",
    fontWeight: "600",
  },
  noteCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  lastNote: {
    marginBottom: 16,
  },
  noteHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  noteLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  noteMood: {
    fontSize: 32,
  },
  noteTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  noteDateTime: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  noteDate: {
    fontSize: 12,
    color: "#666",
  },
  noteSeparator: {
    fontSize: 12,
    color: "#CCC",
  },
  noteTime: {
    fontSize: 12,
    color: "#666",
  },
  noteContent: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
  addNoteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  addNoteText: {
    fontSize: 15,
    fontWeight: "600",
  },
  bottomSpacer: {
    height: 40,
  },
});
