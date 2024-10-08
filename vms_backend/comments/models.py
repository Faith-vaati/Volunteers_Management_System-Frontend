from datetime import datetime

from sqlalchemy import Column, Integer, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from vms_api.factory import db


class Comment(db.Model):
    __tablename__ = 'comments'

    id = Column(Integer, primary_key=True)
    content = Column(Text, nullable=False)
    rating = Column(Integer, nullable=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    # user = relationship('User', backref=db.backref('comments'))
    user = relationship('User', backref='comments')

    gig_id = Column(Integer, ForeignKey('gigs.id'), nullable=False)


    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    def get_summary(self, include_gig=False, include_user=False):
        data = {
            'id': self.id,
            'content': self.content,
            'created_at': self.created_at,
        }

        if include_gig:
            data['gig'] = {
                'id': self.gig.id,
                'slug': self.gig.slug,
                'name': self.gig.name
            }

        if include_user:
            data['user'] = {
                'id': self.user_id,
                'username': self.user.username
            }
        return data
