import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { CheckCircle, XCircle, Star, Home, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";

export default function TaskVerification({ result, task, onReset }) {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className={`shadow-2xl border-0 ${result.verified ? 'bg-gradient-to-br from-green-50 to-green-100' : 'bg-gradient-to-br from-red-50 to-red-100'}`} variant="spacious">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            {result.verified ? (
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            ) : (
              <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center">
                <XCircle className="w-12 h-12 text-white" />
              </div>
            )}
          </div>
          
          <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
            {result.verified ? "Amazing Work! 🎉" : "Keep Trying! 💪"}
          </CardTitle>
          
          {result.verified && (
            <div className="flex items-center justify-center gap-2 mb-4">
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 px-4 py-2 text-lg" variant="success">
                <Star className="w-5 h-5 mr-2 fill-white" />
                +{result.stars_earned} Stars Earned!
              </Badge>
            </div>
          )}
        </CardHeader>
        
        <CardContent className="text-center space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center justify-center gap-2">
              <Star className="w-5 h-5 text-blue-500 fill-blue-400" />
              Task: {task.title}
            </h3>
            
            <div className="mb-4 p-4 bg-blue-50 rounded-xl">
              <p className="text-gray-700 font-medium">{result.feedback}</p>
            </div>
            
            {result.confidence !== undefined && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">AI Confidence</span>
                  <span className="text-sm font-bold text-gray-900">{Math.round(result.confidence * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      result.confidence > 0.8 ? 'bg-green-500' : 
                      result.confidence > 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                    }`} 
                    style={{ width: `${result.confidence * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            {result.detected_elements && result.detected_elements.length > 0 && (
              <div className="text-left mb-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-500" />
                  What our AI detected:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.detected_elements.map((element, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                      {element}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {!result.verified && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  <span className="font-bold">Tip:</span> Make sure your photo clearly shows you completing the eco-friendly activity. 
                  Try taking a photo that clearly captures the action described in the task.
                </p>
              </div>
            )}
          </div>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <Button 
              onClick={onReset}
              variant="outline"
              className="font-bold px-6 py-3 rounded-full border-2 hover:scale-105 transition-transform duration-200"
              size="lg"
            >
              Try Another Task
            </Button>
            
            <Link to={createPageUrl("Dashboard")}>
              <Button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-200" size="lg">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          {result.verified && (
            <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-xl text-green-800">
              <div className="flex items-center justify-center gap-2">
                <Star className="w-6 h-6 fill-yellow-400 text-yellow-500" />
                <span className="font-bold">Congratulations! Your stars have been added to your profile.</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}