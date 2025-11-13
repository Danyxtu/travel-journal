import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const imageSize = (width - 56) / 3; // 20px padding on each side + 8px gap between images

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  uploadButton: {
    shadowColor: "#FF6B6B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  uploadGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: "#666",
    textAlign: "center",
  },
  filterContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
  },
  filterChipInactive: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  filterTextActive: {
    color: "#FFF",
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  photoContainer: {
    width: imageSize,
    height: imageSize,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#E0E0E0",
  },
  photoImage: {
    width: "100%",
    height: "100%",
  },
  photoOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
  },
  photoInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  photoTrip: {
    fontSize: 10,
    color: "#FFF",
    fontWeight: "600",
    flex: 1,
  },
  addPhotoCard: {
    borderRadius: 16,
    padding: 40,
    marginBottom: 16,
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderStyle: "dashed",
    alignItems: "center",
  },
  addPhotoContent: {
    alignItems: "center",
    gap: 8,
  },
  addPhotoText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "600",
  },
  addPhotoSubtext: {
    fontSize: 13,
    color: "#999",
  },
  bottomSpacer: {
    height: 40,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.95)",
  },
  modalBackdrop: {
    flex: 1,
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 10,
  },
  modalImage: {
    width: width,
    height: width,
    alignSelf: "center",
  },
  modalInfo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 40,
  },
  modalInfoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTrip: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 4,
  },
  modalDate: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
  },
  modalActions: {
    flexDirection: "row",
    gap: 16,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSpacer: {
    height: 40,
  },
  floatingActionButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    shadowColor: "#FF6B6B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  fabGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
