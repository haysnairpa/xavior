import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { useTheme } from "next-themes";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import {
	doc,
	getDoc,
	setDoc,
	collection,
	addDoc,
	serverTimestamp,
} from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { db, storage, auth } from "../config/firebase";
import { useAuth } from "../hooks/useAuth";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Loader2 } from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Review = () => {
	const { toast } = useToast();
	const { theme } = useTheme();
	const { user } = useAuth();
	const auth = getAuth();

	const [reviewResults, setReviewResults] = useState(null);
	const [fileURL, setfileURL] = useState(null);
	const [loading, setLoading] = useState(false);
	const [recentUser, setRecentUser] = useState(null);

	const uploadCardRef = useRef(null);
	const resultCardRef = useRef(null);

	const MAX_FILE_SIZE = 5 * 1024 * 1024 * 1024; // 5GB in bytes

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Submit button clicked");

		if (!auth.currentUser) {
			console.error("User not authenticated");
			toast({
				title: "Authentication Error",
				description: "Please login to upload files",
				variant: "destructive",
			});
			return;
		}

		try {
			// Token refresh before uploading
			await auth.currentUser.getIdToken(true);
			console.log(
				"User authenticated and token refreshed:",
				auth.currentUser.uid
			);

			console.log("User authenticated:", auth.currentUser.uid);

			setLoading(true);
			const fileInput = e.target?.querySelector('input[type="file"]');
			const file = fileInput?.files?.[0];
			if (file) {
				if (file.size > MAX_FILE_SIZE) {
					console.error("File too large");
					toast({
						title: "File Too Large",
						description: "Maximum file size is 5GB",
						variant: "destructive",
					});
					return;
				}

				try {
					if (!user) {
						throw new Error("User not authenticated");
					}
					const downloadURL = await uploadFile(file);
					if (!downloadURL) {
						throw new Error("Failed to get download URL");
					}

					// Result Simulation
					const reviewResults = {
						grammarScore: 95,
						structureScore: 90,
						contentScore: 88,
					};
					setReviewResults(reviewResults);

					// Save file data to firestore
					await addFileToHistory(
						file.name,
						downloadURL,
						reviewResults
					);

					toast({
						title: "File successfully submitted and reviewed",
						description: "See the review result in the right",
						variant: "success",
					});
				} catch (error) {
					console.error("Error upload file ", error);
					toast({
						title: "Upload Failed",
						description:
							error.message || "Error occured. Try again later",
						variant: "destructive",
					});
				} finally {
					setLoading(false);
				}
			} else {
				toast({
					title: "No file selected",
					description: "Please select a file to upload.",
					variant: "destructive",
				});
				setLoading(false);
			}
		} catch (error) {
			console.error("Error refreshing token:", error);
			toast({
				title: "Authentication Error",
				description: "Please try logging in again",
				variant: "destructive",
			});
		}
	};

	const uploadFile = async (file) => {
		console.log("Starting uploadFile function");
		if (!auth.currentUser) {
			console.error("User not authenticated");
			throw new Error("User not authenticated");
		}

		try {
			console.log("User authenticated, proceeding with upload");
			// Make sure path sesuai dengan storage rules. kalo ngga FATAL
			const storageRef = ref(
				storage,
				`essays/${auth.currentUser.uid}/${file.name}`
			);
			console.log("Storage reference created:", storageRef);

			console.log("Uploading file...");
			const snapshot = await uploadBytes(storageRef, file);
			console.log("File uploaded successfully, snapshot:", snapshot);

			console.log("Getting download URL...");
			const downloadURL = await getDownloadURL(snapshot.ref);
			console.log("Download URL obtained:", downloadURL);
			return downloadURL;
		} catch (error) {
			console.error("Detailed upload error:", error);
			console.error("Error name:", error.name);
			console.error("Error message:", error.message);
			console.error("Error stack:", error.stack);
			throw error;
		}
	};

	const fetchuserData = async (uid) => {
		try {
			const userDoc = await getDoc(doc(db, "Users", uid));
			if (userDoc.exists()) {
				const userData = userDoc.data();
				setRecentUser(userData);
			}
		} catch (error) {
			console.log("Error fetching user data: " + error);
		} finally {
			setLoading(false);
		}
	};

	const addFileToHistory = async (fileName, fileURL, reviewResults) => {
		try {
			if (!fileURL) {
				console.error("fileURL is undefined");
				throw new Error("fileURL is undefined");
			}
			const userRef = doc(db, "Users", user.uid);
			const historyRef = collection(userRef, "uploadHistory");
			await addDoc(historyRef, {
				fileName,
				fileURL,
				reviewResults,
				uploadDate: serverTimestamp(),
			});
		} catch (error) {
			console.error("Error adding file to history:", error);
			throw error;
		}
	};

	useEffect(() => {
		fetchuserData(user.uid);
		const resizeObserver = new ResizeObserver(() => {
			if (uploadCardRef.current && resultCardRef.current) {
				const uploadHeight = uploadCardRef.current.offsetHeight;
				resultCardRef.current.style.height = `${uploadHeight}px`;
			}
		});

		if (uploadCardRef.current) {
			resizeObserver.observe(uploadCardRef.current);
		}

		return () => resizeObserver.disconnect();
	}, []);

	const chartData = {
		labels: ["Grammar", "Structure", "Content"],
		datasets: [
			{
				data: [95, 90, 88],
				backgroundColor: [
					"rgba(255, 99, 132, 0.8)",
					"rgba(54, 162, 235, 0.8)",
					"rgba(255, 206, 86, 0.8)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
				],
				borderWidth: 1,
			},
		],
	};

	const chartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: "bottom",
				labels: {
					color: theme === "dark" ? "white" : "black",
				},
			},
		},
	};

	return (
		<div className="flex-1 overflow-auto p-4 lg:p-8 bg-white dark:bg-transparent text-gray-900 dark:text-white">
			{recentUser && (
				<>
					<h1 className="text-2xl lg:text-4xl font-bold mb-4 lg:mb-8 text-gray-900 dark:text-white">
						Hello{" "}
						<span className="capitalize">
							{recentUser?.username.split(" ")[0]}
						</span>
						, Welcome to Xavior The AI Essay Reviewer
					</h1>
					<p className="mb-4 text-gray-600 dark:text-gray-400">
						Upload your essay here for AI-powered review. Our system
						will analyze your essay and provide feedback on grammar,
						structure, and content.
					</p>
					<div className="grid gap-4 lg:gap-8 grid-cols-1 lg:grid-cols-2">
						<Card
							className="w-full bg-gray-100 dark:bg-slate-950"
							ref={uploadCardRef}
						>
							<CardHeader>
								<CardTitle className="text-gray-900 dark:text-white">
									Upload Your Essay
								</CardTitle>
								<CardDescription className="text-gray-600 dark:text-gray-400">
									Submit your essay for AI-powered review
								</CardDescription>
							</CardHeader>
							<CardContent>
								<form
									onSubmit={handleSubmit}
									className="space-y-4"
								>
									<Input
										id="essay-upload"
										type="file"
										accept="application/*"
										className="bg-white dark:bg-transparent text-gray-900 dark:text-white"
									/>
									<Textarea
										placeholder="Or paste your essay here..."
										className="min-h-[150px] bg-white dark:bg-transparent text-gray-900 dark:text-white"
									/>
									<Button
										type="submit"
										className="w-full bg-black hover:bg-gray-700 text-white dark:bg-white dark:hover:bg-gray-400 dark:text-black"
									>
										Submit for Review
									</Button>
								</form>
							</CardContent>
						</Card>
						<Card
							className={`w-full flex flex-col dark:bg-[#1b1b23] ${
								reviewResults
									? ""
									: "justify-center items-center text-center"
							}`}
							ref={resultCardRef}
						>
							<CardHeader>
								<CardTitle>AI Review Results</CardTitle>
								<CardDescription>
									Get instant feedback on your essay
								</CardDescription>
							</CardHeader>
							<CardContent className="flex flex-col items-center">
								{loading ? (
									<div className="flex items-center justify-center h-[300px]">
										<Loader2 className="h-8 w-8 animate-spin" />
									</div>
								) : reviewResults ? (
									<div className="space-y-4 w-full">
										<div style={{ height: "300px" }}>
											<Pie
												data={chartData}
												options={chartOptions}
											/>
										</div>
										<Button
											variant="outline"
											className="w-full hover:text-black dark:bg-white dark:hover:bg-gray-400 dark:text-black"
										>
											View Detailed Report
										</Button>
									</div>
								) : (
									<p>
										Submit your essay to see AI-generated
										review results here.
									</p>
								)}
							</CardContent>
						</Card>
					</div>
				</>
			)}
		</div>
	);
};
