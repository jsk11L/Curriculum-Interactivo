"""Pydantic schemas for API payloads and responses."""

from datetime import datetime

from pydantic import BaseModel, EmailStr, Field, HttpUrl


class PersonalInfo(BaseModel):
    name: str
    title: str
    summary: str
    github_url: HttpUrl
    linkedin_url: HttpUrl
    email: EmailStr


class Experience(BaseModel):
    id: str
    company: str
    position: str
    start_date: str = Field(pattern=r"^\d{4}-\d{2}$")
    end_date: str = Field(pattern=r"^(\d{4}-\d{2}|Present)$")
    description: list[str] = Field(default_factory=list)
    technologies: list[str] = Field(default_factory=list)


class Skill(BaseModel):
    category: str
    items: list[str] = Field(default_factory=list)
    proficiency: int = Field(ge=1, le=100)


class ContactMessageCreate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    content: str = Field(min_length=10, max_length=2000)


class ContactMessage(ContactMessageCreate):
    created_at: datetime


class ContactResponse(BaseModel):
    status: str


class ProjectLink(BaseModel):
    type: str = Field(description="Link type: github, demo, live, etc.")
    url: HttpUrl
    label: str = Field(default="View")


class Project(BaseModel):
    id: str
    title: str
    short_description: str
    description: str
    images: list[str] = Field(default_factory=list, description="List of image URLs")
    technologies: list[str] = Field(default_factory=list)
    links: list[ProjectLink] = Field(default_factory=list)
    created_at: str = Field(pattern=r"^(\d{4}-\d{2}-\d{2})?$")
